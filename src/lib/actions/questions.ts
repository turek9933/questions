"use server";

import { db } from "@/lib/db";
import { questions } from "@/data/questions";

const MIN_WEIGHT = 0.05;
const MAX_WEIGHT = 2.0;

export async function getWeights(sessionId: string) {
  const result = await db.execute({
    sql: "SELECT question_id, weight FROM question_weights WHERE session_id = ?",
    args: [sessionId],
  });

  const weights: Record<number, number> = {};
  for (const row of result.rows) {
    weights[row.question_id as number] = row.weight as number;
  }
  return weights;
}

function weightedPick(
  items: { id: number; weight: number }[]
): number | null {
  if (items.length === 0) return null;
  const totalWeight = items.reduce((sum, w) => sum + w.weight, 0);
  const random = Math.random() * totalWeight;
  let cumulative = 0;
  for (const item of items) {
    cumulative += item.weight;
    if (random <= cumulative) return item.id;
  }
  return items[0].id;
}

type QuestionFilter = "all" | "unanswered" | "red" | "unanswered_or_red";

export async function getFilteredRandomQuestion(
  sessionId: string,
  excludeIds: number[],
  filter: QuestionFilter = "all"
): Promise<{ id: number; question: string } | null> {
  let sql: string;
  const args: (string | number)[] = [sessionId];

  switch (filter) {
    case "unanswered":
      sql = "SELECT question_id, weight FROM question_weights WHERE session_id = ? AND total_answers = 0";
      break;
    case "red":
      sql = "SELECT question_id, weight FROM question_weights WHERE session_id = ? AND last_score IS NOT NULL AND last_score < 3";
      break;
    case "unanswered_or_red":
      sql = "SELECT question_id, weight FROM question_weights WHERE session_id = ? AND (total_answers = 0 OR (last_score IS NOT NULL AND last_score < 3))";
      break;
    default:
      sql = "SELECT question_id, weight FROM question_weights WHERE session_id = ?";
      break;
  }

  const result = await db.execute({ sql, args });

  const candidates: { id: number; weight: number }[] = [];
  for (const row of result.rows) {
    const qid = row.question_id as number;
    if (excludeIds.includes(qid)) continue;
    candidates.push({ id: qid, weight: row.weight as number });
  }

  if (candidates.length === 0) {
    if (excludeIds.length > 0) {
      return getFilteredRandomQuestion(sessionId, [], filter);
    }
    return null;
  }

  const picked = weightedPick(candidates);
  if (picked === null) return null;

  const q = questions.find((q) => q.id === picked);
  return q ? { id: q.id, question: q.question } : null;
}

export async function getWeightedRandomQuestion(
  sessionId: string,
  excludeIds: number[]
): Promise<{ id: number; question: string } | null> {
  return getFilteredRandomQuestion(sessionId, excludeIds, "all");
}

export async function drawStudyQuestions(
  sessionId: string,
  count: number
): Promise<{ id: number; question: string; answer: string }[]> {
  const weightsResult = await db.execute({
    sql: "SELECT question_id, weight FROM question_weights WHERE session_id = ?",
    args: [sessionId],
  });

  const pool: { id: number; weight: number }[] = [];
  for (const row of weightsResult.rows) {
    pool.push({ id: row.question_id as number, weight: row.weight as number });
  }

  const drawn: { id: number; question: string; answer: string }[] = [];
  const used = new Set<number>();

  for (let i = 0; i < count && pool.length > used.size; i++) {
    const available = pool.filter((p) => !used.has(p.id));
    const picked = weightedPick(available);
    if (picked === null) break;
    used.add(picked);
    const q = questions.find((qq) => qq.id === picked);
    if (q) drawn.push({ id: q.id, question: q.question, answer: q.answer });
  }

  return drawn;
}

export async function pickFromCandidates(
  candidates: { id: number; weight: number }[]
): Promise<number | null> {
  return weightedPick(candidates);
}

export async function updateWeight(
  sessionId: string,
  questionId: number,
  score: number
): Promise<void> {
  let factor: number;
  if (score >= 4) factor = 0.4;
  else if (score === 3) factor = 0.7;
  else factor = 1.2;

  await db.execute({
    sql: `UPDATE question_weights SET weight = MIN(?, MAX(?, weight * ?)) WHERE session_id = ? AND question_id = ?`,
    args: [MAX_WEIGHT, MIN_WEIGHT, factor, sessionId, questionId],
  });
}

export async function skipQuestion(
  sessionId: string,
  questionId: number
): Promise<void> {
  await db.execute({
    sql: `UPDATE question_weights SET weight = MIN(?, MAX(?, weight * 1.2)) WHERE session_id = ? AND question_id = ?`,
    args: [MAX_WEIGHT, MIN_WEIGHT, sessionId, questionId],
  });
}

export async function resetWeights(sessionId: string): Promise<void> {
  await db.execute({
    sql: "UPDATE question_weights SET weight = 1.0 WHERE session_id = ?",
    args: [sessionId],
  });
}
