import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getStats } from "@/lib/actions/answers";
import { SessionPageClient } from "@/components/session-page-client";

export default async function SessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const sessionResult = await db.execute({
    sql: "SELECT id, name FROM sessions WHERE id = ?",
    args: [id],
  });

  if (sessionResult.rows.length === 0) {
    notFound();
  }

  const session = {
    id: sessionResult.rows[0].id as string,
    name: sessionResult.rows[0].name as string,
  };

  const stats = await getStats(id);

  return <SessionPageClient session={session} initialStats={stats} />;
}
