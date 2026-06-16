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
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { questions } from "@/data/questions";

interface Props {
  questionScores: { question_id: number; last_score: number | null }[];
}

export function ReviewView({ questionScores }: Props) {
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<number | null>(null);

  const scoreMap = useMemo(() => {
    const map = new Map<number, number | null>();
    for (const qs of questionScores) {
      map.set(qs.question_id, qs.last_score);
    }
    return map;
  }, [questionScores]);

  const filtered = useMemo(() => {
    if (!search.trim()) return questions;
    const q = search.toLowerCase();
    return questions.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Szukaj pytania..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ScrollArea className="h-[65vh]">
        <div className="space-y-2 pr-4">
          {filtered.map((q) => {
            const lastScore = scoreMap.get(q.id);

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
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-muted-foreground shrink-0">
                            #{q.id}
                          </span>
                          {lastScore !== null && lastScore !== undefined && (
                            <Badge
                              className={
                                lastScore >= 8
                                  ? "bg-green-100 text-green-800 border-green-300 hover:bg-green-100"
                                  : lastScore >= 5
                                    ? "bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-100"
                                    : "bg-red-100 text-red-800 border-red-300 hover:bg-red-100"
                              }
                            >
                              {lastScore}/10
                            </Badge>
                          )}
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
