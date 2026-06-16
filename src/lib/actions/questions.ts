"use server";

import { db } from "@/lib/db";
import { questions } from "@/data/questions";

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

export async function getWeightedRandomQuestion(
  sessionId: string,
  excludeIds: number[]
): Promise<{ id: number; question: string } | null> {
  const weightsResult = await db.execute({
    sql: "SELECT question_id, weight FROM question_weights WHERE session_id = ?",
    args: [sessionId],
  });

  const weights: { id: number; weight: number }[] = [];
  for (const row of weightsResult.rows) {
    const qid = row.question_id as number;
    if (!excludeIds.includes(qid)) {
      weights.push({ id: qid, weight: row.weight as number });
    }
  }

  if (weights.length === 0) {
    if (excludeIds.length > 0) {
      return getWeightedRandomQuestion(sessionId, []);
    }
    return null;
  }

  const totalWeight = weights.reduce((sum, w) => sum + w.weight, 0);
  const random = Math.random() * totalWeight;
  let cumulative = 0;

  for (const w of weights) {
    cumulative += w.weight;
    if (random <= cumulative) {
      const q = questions.find((q) => q.id === w.id);
      if (q) return { id: q.id, question: q.question };
    }
  }

  const fallback = questions.find((q) => q.id === weights[0].id);
  return fallback ? { id: fallback.id, question: fallback.question } : null;
}

export async function updateWeight(
  sessionId: string,
  questionId: number,
  score: number
): Promise<void> {
  let factor: number;
  if (score >= 8) factor = 0.4;
  else if (score >= 5) factor = 0.7;
  else factor = 1.2;

  const minWeight = 0.05;

  await db.execute({
    sql: `UPDATE question_weights SET weight = MAX(?, weight * ?) WHERE session_id = ? AND question_id = ?`,
    args: [minWeight, factor, sessionId, questionId],
  });
}

export async function skipQuestion(
  sessionId: string,
  questionId: number
): Promise<void> {
  const minWeight = 0.05;
  await db.execute({
    sql: `UPDATE question_weights SET weight = MAX(?, weight * 1.2) WHERE session_id = ? AND question_id = ?`,
    args: [minWeight, sessionId, questionId],
  });
}

export async function resetWeights(sessionId: string): Promise<void> {
  await db.execute({
    sql: "UPDATE question_weights SET weight = 1.0 WHERE session_id = ?",
    args: [sessionId],
  });
}
