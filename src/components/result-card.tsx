"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { buttonVariants } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  result: { score: number; feedback: string };
  referenceAnswer: string;
}

export function ResultCard({ result, referenceAnswer }: Props) {
  const [open, setOpen] = useState(false);

  const colorClass =
    result.score >= 8
      ? "bg-green-100 text-green-800 border-green-300"
      : result.score >= 5
        ? "bg-yellow-100 text-yellow-800 border-yellow-300"
        : "bg-red-100 text-red-800 border-red-300";

  return (
    <div className="space-y-4">
      <Card className={`text-center py-6 ${colorClass}`}>
        <CardContent>
          <p className="text-sm font-medium mb-1">Ocena</p>
          <p className="text-6xl font-bold">{result.score}</p>
          <p className="text-sm mt-1">/ 10</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <p className="text-sm leading-relaxed">{result.feedback}</p>
        </CardContent>
      </Card>

      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger
          className={cn(
            buttonVariants({ variant: "outline" }),
            "w-full flex items-center gap-2 cursor-pointer"
          )}
        >
          {open ? "Ukryj" : "Pokaż"} wzorcową odpowiedź
          {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-3">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {referenceAnswer}
              </p>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
