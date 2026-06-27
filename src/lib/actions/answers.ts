"use server";

import { nanoid } from "nanoid";
import { db } from "@/lib/db";
import { questions } from "@/data/questions";
import { Stats } from "@/lib/types";

export async function saveAnswer(
  sessionId: string,
  questionId: number,
  score: number
): Promise<void> {
  const id = nanoid();
  const now = Date.now();

  await db.batch([
    {
      sql: "INSERT INTO answer_records (id, session_id, question_id, score, answered_at) VALUES (?, ?, ?, ?, ?)",
      args: [id, sessionId, questionId, score, now],
    },
    {
      sql: `UPDATE question_weights SET
        total_answers = total_answers + 1,
        total_score_sum = total_score_sum + ?,
        last_score = ?,
        last_answer_at = ?
      WHERE session_id = ? AND question_id = ?`,
      args: [score, score, now, sessionId, questionId],
    },
  ]);
}

export async function getQuestionPracticeStats(sessionId: string, questionId: number) {
  const result = await db.execute({
    sql: `SELECT total_answers,
      CASE WHEN total_answers > 0 THEN CAST(total_score_sum AS REAL) / total_answers ELSE 0 END as avg_score,
      weight
    FROM question_weights WHERE session_id = ? AND question_id = ?`,
    args: [sessionId, questionId],
  });

  if (result.rows.length === 0) {
    return { avgScore: 0, weight: 1.0, totalAnswers: 0 };
  }

  const row = result.rows[0];
  return {
    avgScore: Math.round((row.avg_score as number) * 10) / 10,
    weight: Math.round((row.weight as number) * 100) / 100,
    totalAnswers: row.total_answers as number,
  };
}

export async function getStats(sessionId: string): Promise<Stats> {
  const qwResult = await db.execute({
    sql: `SELECT
      COALESCE(SUM(total_answers), 0) as total_answers,
      COALESCE(SUM(total_score_sum), 0) as total_score_sum,
      COALESCE(SUM(CASE WHEN total_answers > 0 THEN 1 ELSE 0 END), 0) as coverage,
      COUNT(*) as total_questions
    FROM question_weights WHERE session_id = ?`,
    args: [sessionId],
  });

  const qw = qwResult.rows[0];
  const totalAnswers = qw.total_answers as number;
  const totalScoreSum = qw.total_score_sum as number;
  const averageScore = totalAnswers > 0 ? totalScoreSum / totalAnswers : 0;
  const coverage = qw.coverage as number;
  const totalQuestions = qw.total_questions as number;

  const lowestResult = await db.execute({
    sql: `SELECT question_id,
      CAST(COALESCE(SUM(score), 0) AS REAL) / NULLIF(COUNT(*), 0) as avg_score
    FROM answer_records WHERE session_id = ?
    GROUP BY question_id
    ORDER BY avg_score ASC
    LIMIT 10`,
    args: [sessionId],
  });

  const lowestScores = lowestResult.rows.map((row) => {
    const q = questions.find((q) => q.id === (row.question_id as number));
    return {
      question_id: row.question_id as number,
      question: q?.question ?? `Pytanie #${row.question_id}`,
      avg_score: row.avg_score as number,
    };
  });

  const histogramResult = await db.execute({
    sql: "SELECT score, COUNT(*) as count FROM answer_records WHERE session_id = ? GROUP BY score ORDER BY score",
    args: [sessionId],
  });

  const histogram: Record<number, number> = {};
  for (let i = 0; i <= 5; i++) histogram[i] = 0;
  for (const row of histogramResult.rows) {
    histogram[row.score as number] = row.count as number;
  }

  const questionScoresResult = await db.execute({
    sql: "SELECT question_id, last_score, weight FROM question_weights WHERE session_id = ?",
    args: [sessionId],
  });

  const questionScores = questions.map((q) => {
    const row = questionScoresResult.rows.find(
      (r) => (r.question_id as number) === q.id
    );
    return {
      question_id: q.id,
      last_score: row ? (row.last_score as number | null) : null,
      weight: row ? (row.weight as number) : 1.0,
    };
  });

  return {
    total_answers: totalAnswers,
    average_score: Math.round(averageScore * 100) / 100,
    coverage,
    total_questions: totalQuestions,
    lowest_scores: lowestScores,
    histogram,
    question_scores: questionScores,
  };
}
