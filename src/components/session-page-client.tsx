"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PracticeView } from "@/components/practice-view";
import { ReviewView } from "@/components/review-view";
import { StatsView } from "@/components/stats-view";
import { SettingsView } from "@/components/settings-view";
import { updateSessionLastUsed } from "@/lib/actions/sessions";
import type { Stats } from "@/lib/types";
import { useEffect } from "react";

interface Props {
  session: { id: string; name: string };
  initialStats: Stats;
}

export function SessionPageClient({ session, initialStats }: Props) {
  useEffect(() => {
    updateSessionLastUsed(session.id);
  }, [session.id]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Sesja: {session.name}</h1>

      <Tabs defaultValue="practice" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="practice">Losowe pytanie</TabsTrigger>
          <TabsTrigger value="review">Lista pytań</TabsTrigger>
          <TabsTrigger value="stats">Statystyki</TabsTrigger>
          <TabsTrigger value="settings">Ustawienia</TabsTrigger>
        </TabsList>

        <TabsContent value="practice">
          <PracticeView sessionId={session.id} />
        </TabsContent>

        <TabsContent value="review">
          <ReviewView questionScores={initialStats.question_scores} />
        </TabsContent>

        <TabsContent value="stats">
          <StatsView stats={initialStats} />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsView sessionId={session.id} sessionName={session.name} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
