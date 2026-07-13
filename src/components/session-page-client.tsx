"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PracticeView } from "@/components/practice-view";
import { StudyView } from "@/components/study-view";
import { ReviewView } from "@/components/review-view";
import { StatsView } from "@/components/stats-view";
import { SettingsView } from "@/components/settings-view";
import Link from "next/link";
import { updateSessionLastUsed } from "@/lib/actions/sessions";
import type { Stats } from "@/lib/types";
import { useEffect, useState } from "react";
import { Dices, BookOpen, List, BarChart3, Settings } from "lucide-react";

interface Props {
  session: { id: string; name: string };
  initialStats: Stats;
}

export function SessionPageClient({ session, initialStats }: Props) {
  const [statsKey, setStatsKey] = useState(0);

  useEffect(() => {
    updateSessionLastUsed(session.id);
  }, [session.id]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Sesja: {session.name}</h1>
        <Link
          href="/stats"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <BarChart3 className="h-4 w-4" />
          <span className="hidden sm:inline">Statystyki globalne</span>
        </Link>
      </div>

      <Tabs
        defaultValue="practice"
        className="w-full"
        onValueChange={(value) => {
          if (value === "stats") {
            setStatsKey((k) => k + 1);
          }
        }}
      >
        <TabsList className="mb-6 justify-start sm:justify-center">
          <TabsTrigger value="practice">
            <Dices className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">Losowe pytanie</span>
          </TabsTrigger>
          <TabsTrigger value="study">
            <BookOpen className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">Nauka</span>
          </TabsTrigger>
          <TabsTrigger value="review">
            <List className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">Lista pytań</span>
          </TabsTrigger>
          <TabsTrigger value="stats">
            <BarChart3 className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">Statystyki</span>
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">Ustawienia</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="practice">
          <PracticeView sessionId={session.id} />
        </TabsContent>

        <TabsContent value="study">
          <StudyView sessionId={session.id} />
        </TabsContent>

        <TabsContent value="review">
          <ReviewView questionScores={initialStats.question_scores} />
        </TabsContent>

        <TabsContent value="stats">
          <StatsView key={statsKey} sessionId={session.id} />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsView sessionId={session.id} sessionName={session.name} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
