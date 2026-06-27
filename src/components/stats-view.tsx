"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RefreshCw } from "lucide-react";
import { getStats } from "@/lib/actions/answers";
import type { Stats } from "@/lib/types";

interface Props {
  sessionId: string;
}

export function StatsView({ sessionId }: Props) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshStats = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getStats(sessionId);
      setStats(data);
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const data = await getStats(sessionId);
        if (!cancelled) setStats(data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [sessionId]);

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Ładowanie statystyk...</p>
      </div>
    );
  }

  const coveragePercent = Math.round(
    (stats.coverage / stats.total_questions) * 100
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={refreshStats}
          disabled={loading}
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          Odśwież
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Łącznie odpowiedzi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.total_answers}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Średni wynik
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.average_score}</p>
            <p className="text-xs text-muted-foreground mt-1">/ 5</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pokrycie puli
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {stats.coverage}/{stats.total_questions}
            </p>
            <Progress value={coveragePercent} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Histogram wyników</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Array.from({ length: 6 }, (_, i) => {
              const count = stats.histogram[i] ?? 0;
              const max = Math.max(
                ...Object.values(stats.histogram),
                1
              );
              const width = (count / max) * 100;
              return (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-6 text-right text-sm font-mono text-muted-foreground">
                    {i}
                  </span>
                  <div className="flex-1 h-5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        i >= 4
                          ? "bg-green-500"
                          : i >= 3
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                      style={{ width: `${width}%` }}
                    />
                  </div>
                  <span className="w-8 text-sm font-mono text-muted-foreground">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {stats.lowest_scores.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pytania z najniższym wynikiem</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.lowest_scores.map((item) => (
                <div
                  key={item.question_id}
                  className="flex items-center justify-between gap-4"
                >
                  <p className="text-sm flex-1 line-clamp-2">{item.question}</p>
                  <Badge
                    className={
                      item.avg_score >= 4
                        ? "bg-green-100 text-green-800 shrink-0"
                        : item.avg_score >= 3
                          ? "bg-yellow-100 text-yellow-800 shrink-0"
                          : "bg-red-100 text-red-800 shrink-0"
                    }
                  >
                    {Math.round(item.avg_score * 10) / 10}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
