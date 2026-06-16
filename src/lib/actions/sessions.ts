"use server";

import { nanoid } from "nanoid";
import { db } from "@/lib/db";
import { questions } from "@/data/questions";
import { Session } from "@/lib/types";

export async function getSessions(): Promise<Session[]> {
  const result = await db.execute(
    "SELECT s.*, (SELECT COUNT(*) FROM answer_records WHERE session_id = s.id) as answer_count FROM sessions s ORDER BY last_used_at DESC"
  );
  return result.rows.map((row) => ({
    id: row.id as string,
    name: row.name as string,
    created_at: row.created_at as number,
    last_used_at: row.last_used_at as number,
  }));
}

export async function createSession(name: string): Promise<Session> {
  const id = nanoid();
  const now = Date.now();

  await db.execute({
    sql: "INSERT INTO sessions (id, name, created_at, last_used_at) VALUES (?, ?, ?, ?)",
    args: [id, name, now, now],
  });

  const stmt = `INSERT INTO question_weights (session_id, question_id, weight) VALUES (?, ?, 1.0)`;
  await db.batch(
    questions.map((q) => ({ sql: stmt, args: [id, q.id] }))
  );

  return { id, name, created_at: now, last_used_at: now };
}

export async function deleteSession(id: string): Promise<void> {
  await db.execute({ sql: "DELETE FROM sessions WHERE id = ?", args: [id] });
}

export async function updateSessionLastUsed(id: string): Promise<void> {
  await db.execute({
    sql: "UPDATE sessions SET last_used_at = ? WHERE id = ?",
    args: [Date.now(), id],
  });
}
