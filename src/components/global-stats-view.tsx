"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, ArrowLeft, X, Clock } from "lucide-react";
import type { GlobalStatsEntry, LastAnswerInfo } from "@/lib/types";

interface Props {
  entries: GlobalStatsEntry[];
  lastAnswer: LastAnswerInfo | null;
}

type SortField = "name" | "total_answers" | "average_score" | "coverage" | "last_used_at";
type SortDir = "asc" | "desc";

const sortLabels: Record<SortField, string> = {
  name: "Nazwa",
  total_answers: "Liczba odpowiedzi",
  average_score: "Średni wynik",
  coverage: "Pokrycie",
  last_used_at: "Data aktywności",
};

export function GlobalStatsView({ entries, lastAnswer }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("last_used_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const toggleSortDir = () => setSortDir((d) => (d === "asc" ? "desc" : "asc"));

  const filtered = useMemo(() => {
    let items = [...entries];

    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter((e) => e.name.toLowerCase().includes(q));
    }

    items.sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case "name":
          cmp = a.name.localeCompare(b.name);
          break;
        case "total_answers":
          cmp = a.total_answers - b.total_answers;
          break;
        case "average_score":
          cmp = a.average_score - b.average_score;
          break;
        case "coverage":
          cmp = a.coverage - b.coverage;
          break;
        case "last_used_at":
          cmp = a.last_used_at - b.last_used_at;
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return items;
  }, [entries, search, sortField, sortDir]);

  const totalSessions = entries.length;
  const totalAnswersAll = entries.reduce((s, e) => s + e.total_answers, 0);
  const avgScoreAll =
    totalAnswersAll > 0
      ? entries.reduce((s, e) => s + e.average_score * e.total_answers, 0) / totalAnswersAll
      : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Statystyki globalne</h1>
          <p className="text-sm text-muted-foreground">
            Podsumowanie wszystkich sesji
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Liczba sesji
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalSessions}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Łącznie odpowiedzi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalAnswersAll}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Średnia globalna
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{avgScoreAll.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">/ 5</p>
          </CardContent>
        </Card>
      </div>

      {lastAnswer && (
        <Card className="border-primary/20 bg-primary/[0.03]">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground">
                Ostatnia odpowiedź
              </p>
              <p className="font-semibold truncate">
                {lastAnswer.sessionName}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(lastAnswer.answeredAt).toLocaleDateString("pl-PL", {
                  day: "numeric",
                  month: "long",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm text-muted-foreground">Wynik</p>
              <Badge
                className={
                  lastAnswer.score >= 4
                    ? "bg-green-100 text-green-800 border-green-300"
                    : lastAnswer.score >= 3
                      ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                      : "bg-red-100 text-red-800 border-red-300"
                }
              >
                {lastAnswer.score}/5
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Szukaj sesji..."
            className="pl-9 pr-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Wyczyść wyszukiwanie"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Select value={sortField} onValueChange={(v) => setSortField(v as SortField)}>
          <SelectTrigger className="w-48">
            <span>{sortLabels[sortField]}</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Nazwa</SelectItem>
            <SelectItem value="total_answers">Liczba odpowiedzi</SelectItem>
            <SelectItem value="average_score">Średni wynik</SelectItem>
            <SelectItem value="coverage">Pokrycie</SelectItem>
            <SelectItem value="last_used_at">Data aktywności</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={toggleSortDir} className="w-24">
          {sortDir === "asc" ? "↑ Rosnąco" : "↓ Malejąco"}
        </Button>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            Brak sesji spełniających kryteria.
          </p>
        )}
        {filtered.map((entry) => {
          const coveragePercent = Math.round(
            (entry.coverage / entry.total_questions) * 100
          );
          return (
            <Card
              key={entry.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => router.push(`/session/${entry.id}`)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate">
                      {entry.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Ostatnia aktywność:{" "}
                      {new Date(entry.last_used_at).toLocaleDateString("pl-PL")}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Średnia</p>
                      <Badge
                        className={
                          entry.average_score >= 4
                            ? "bg-green-100 text-green-800 border-green-300"
                            : entry.average_score >= 3
                              ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                              : "bg-red-100 text-red-800 border-red-300"
                        }
                      >
                        {entry.average_score.toFixed(2)}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Odpowiedzi</p>
                      <p className="font-bold">{entry.total_answers}</p>
                    </div>
                    <div className="text-right min-w-[80px]">
                      <p className="text-sm text-muted-foreground">Pokrycie</p>
                      <p className="font-bold">
                        {entry.coverage}/{entry.total_questions}
                      </p>
                    </div>
                  </div>
                </div>
                <Progress value={coveragePercent} className="mt-3" />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
