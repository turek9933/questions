"use server";

import { nanoid } from "nanoid";
import { db } from "@/lib/db";
import { questions } from "@/data/questions";
import { Stats } from "@/lib/types";

export async function saveAnswer(
  sessionId: string,
  questionId: number,
  userAnswer: string,
  score: number,
  feedback: string
): Promise<void> {
  const id = nanoid();
  const now = Date.now();

  await db.execute({
    sql: "INSERT INTO answer_records (id, session_id, question_id, user_answer, score, feedback, answered_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
    args: [id, sessionId, questionId, userAnswer, score, feedback, now],
  });
}

export async function getStats(sessionId: string): Promise<Stats> {
  const totalResult = await db.execute({
    sql: `SELECT 
      COUNT(*) as total_answers,
      COALESCE(AVG(score), 0) as average_score
    FROM answer_records WHERE session_id = ?`,
    args: [sessionId],
  });

  const totalAnswers = totalResult.rows[0].total_answers as number;
  const averageScore = totalResult.rows[0].average_score as number;

  const distinctResult = await db.execute({
    sql: "SELECT COUNT(DISTINCT question_id) as coverage FROM answer_records WHERE session_id = ?",
    args: [sessionId],
  });

  const coverage = distinctResult.rows[0].coverage as number;

  const lowestResult = await db.execute({
    sql: `SELECT question_id, AVG(score) as avg_score 
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
  for (let i = 0; i <= 10; i++) histogram[i] = 0;
  for (const row of histogramResult.rows) {
    histogram[row.score as number] = row.count as number;
  }

  const questionScoresResult = await db.execute({
    sql: `SELECT question_id, score 
    FROM answer_records 
    WHERE session_id = ? 
    AND answered_at IN (
      SELECT MAX(answered_at) 
      FROM answer_records 
      WHERE session_id = ? 
      GROUP BY question_id
    )`,
    args: [sessionId, sessionId],
  });

  const scoreMap = new Map<number, number>();
  for (const row of questionScoresResult.rows) {
    scoreMap.set(row.question_id as number, row.score as number);
  }

  const questionScores = questions.map((q) => ({
    question_id: q.id,
    last_score: scoreMap.get(q.id) ?? null,
  }));

  return {
    total_answers: totalAnswers,
    average_score: Math.round(averageScore * 100) / 100,
    coverage,
    total_questions: questions.length,
    lowest_scores: lowestScores,
    histogram,
    question_scores: questionScores,
  };
}
