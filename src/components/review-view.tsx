"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { ChevronDown, ChevronUp, Search, X } from "lucide-react";
import { questions } from "@/data/questions";

interface QuestionScore {
  question_id: number;
  last_score: number | null;
  weight: number;
}

interface Props {
  questionScores: QuestionScore[];
}

type ScoreFilter = "all" | "answered" | "unanswered" | "green" | "yellow" | "red" | "unanswered_or_red";
type SortMode = "id_asc" | "id_desc" | "score_asc" | "score_desc" | "weight_asc" | "weight_desc";

const filterLabels: Record<ScoreFilter, string> = {
  all: "Wszystkie",
  answered: "Odpowiedziane",
  unanswered: "Nieodpowiedziane",
  green: "Zielone (≥4)",
  yellow: "Żółte (3)",
  red: "Czerwone (<3)",
  unanswered_or_red: "Nieodp. lub czerwone",
};

const sortLabels: Record<SortMode, string> = {
  id_asc: "ID ↑",
  id_desc: "ID ↓",
  score_asc: "Ocena ↑",
  score_desc: "Ocena ↓",
  weight_asc: "Waga ↑",
  weight_desc: "Waga ↓",
};

export function ReviewView({ questionScores }: Props) {
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<number | null>(null);
  const [scoreFilter, setScoreFilter] = useState<ScoreFilter>("all");
  const [sortMode, setSortMode] = useState<SortMode>("id_asc");

  const scoreMap = useMemo(() => {
    const map = new Map<number, { last_score: number | null; weight: number }>();
    for (const qs of questionScores) {
      map.set(qs.question_id, { last_score: qs.last_score, weight: qs.weight });
    }
    return map;
  }, [questionScores]);

  const filtered = useMemo(() => {
    let items = [...questions];

    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (item) =>
          item.question.toLowerCase().includes(q) ||
          item.answer.toLowerCase().includes(q)
      );
    }

    if (scoreFilter !== "all") {
      items = items.filter((item) => {
        const info = scoreMap.get(item.id);
        const lastScore = info?.last_score ?? null;
        const hasAnswer = lastScore !== null && lastScore !== undefined;

        switch (scoreFilter) {
          case "answered":
            return hasAnswer;
          case "unanswered":
            return !hasAnswer;
          case "green":
            return hasAnswer && lastScore >= 4;
          case "yellow":
            return hasAnswer && lastScore === 3;
          case "red":
            return hasAnswer && lastScore < 3;
          case "unanswered_or_red":
            return !hasAnswer || (lastScore !== null && lastScore < 3);
          default:
            return true;
        }
      });
    }

    items.sort((a, b) => {
      const aInfo = scoreMap.get(a.id);
      const bInfo = scoreMap.get(b.id);
      const aScore = aInfo?.last_score ?? -1;
      const bScore = bInfo?.last_score ?? -1;
      const aWeight = aInfo?.weight ?? 1;
      const bWeight = bInfo?.weight ?? 1;

      switch (sortMode) {
        case "id_asc": return a.id - b.id;
        case "id_desc": return b.id - a.id;
        case "score_asc": return aScore - bScore;
        case "score_desc": return bScore - aScore;
        case "weight_asc": return aWeight - bWeight;
        case "weight_desc": return bWeight - aWeight;
        default: return 0;
      }
    });

    return items;
  }, [search, scoreFilter, sortMode, scoreMap]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Szukaj pytania..."
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
        <Select value={scoreFilter} onValueChange={(v) => setScoreFilter(v as ScoreFilter)}>
          <SelectTrigger className="w-44">
            <span>{filterLabels[scoreFilter]}</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Wszystkie</SelectItem>
            <SelectItem value="answered">Odpowiedziane</SelectItem>
            <SelectItem value="unanswered">Nieodpowiedziane</SelectItem>
            <SelectItem value="unanswered_or_red">Nieodp. lub czerwone</SelectItem>
            <SelectItem value="green">Zielone (≥4)</SelectItem>
            <SelectItem value="yellow">Żółte (3)</SelectItem>
            <SelectItem value="red">Czerwone (&lt;3)</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortMode} onValueChange={(v) => setSortMode(v as SortMode)}>
          <SelectTrigger className="w-36">
            <span>{sortLabels[sortMode]}</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="id_asc">ID ↑</SelectItem>
            <SelectItem value="id_desc">ID ↓</SelectItem>
            <SelectItem value="score_asc">Ocena ↑</SelectItem>
            <SelectItem value="score_desc">Ocena ↓</SelectItem>
            <SelectItem value="weight_asc">Waga ↑</SelectItem>
            <SelectItem value="weight_desc">Waga ↓</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ScrollArea className="h-[60vh]">
        <div className="space-y-2 pr-4">
          {filtered.map((q) => {
            const info = scoreMap.get(q.id);
            const lastScore = info?.last_score ?? null;
            const weight = info?.weight ?? 1;

            return (
              <Collapsible
                key={q.id}
                open={openId === q.id}
                onOpenChange={(open) => setOpenId(open ? q.id : null)}
              >
                <Card className="hover:shadow-sm transition-shadow">
                  <CardContent className="p-0">
                    <CollapsibleTrigger className="w-full text-left p-4 flex items-start gap-3 cursor-pointer">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-xs font-mono text-muted-foreground shrink-0">
                            #{q.id}
                          </span>
                          {lastScore !== null && lastScore !== undefined && (
                            <Badge
                              className={
                                lastScore >= 4
                                  ? "bg-green-100 text-green-800 border-green-300 hover:bg-green-100"
                                  : lastScore >= 3
                                    ? "bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-100"
                                    : "bg-red-100 text-red-800 border-red-300 hover:bg-red-100"
                              }
                            >
                              {lastScore}/5
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs font-mono">
                            waga: {weight}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium leading-relaxed line-clamp-2">
                          {q.question}
                        </p>
                      </div>
                      {openId === q.id ? (
                        <ChevronUp className="h-4 w-4 shrink-0 mt-1 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 shrink-0 mt-1 text-muted-foreground" />
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-4 pb-4 pt-0 border-t">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap mt-3">
                          {q.answer}
                        </p>
                      </div>
                    </CollapsibleContent>
                  </CardContent>
                </Card>
              </Collapsible>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
