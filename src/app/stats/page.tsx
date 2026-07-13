export const dynamic = "force-dynamic";

import { getAllSessionsStats } from "@/lib/actions/answers";
import { GlobalStatsView } from "@/components/global-stats-view";

export default async function StatsPage() {
  const data = await getAllSessionsStats();
  return <GlobalStatsView entries={data.entries} lastAnswer={data.lastAnswer} />;
}
