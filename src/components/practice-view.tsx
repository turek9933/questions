"use client";

import { useState } from "react";
import { useRecentQuestions } from "@/hooks/use-recent-questions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { ResultCard } from "@/components/result-card";
import { getFilteredRandomQuestion, skipQuestion, updateWeight } from "@/lib/actions/questions";
import { evaluateAnswer } from "@/lib/actions/evaluate";
import { saveAnswer, getQuestionPracticeStats } from "@/lib/actions/answers";
import { questions } from "@/data/questions";
import { Info } from "lucide-react";

interface Props {
  sessionId: string;
}

type QuestionFilter = "all" | "unanswered" | "red" | "unanswered_or_red";

const filterLabels: Record<QuestionFilter, string> = {
  all: "Wszystkie pytania",
  unanswered: "Tylko nieodpowiedziane",
  red: "Tylko czerwone",
  unanswered_or_red: "Nieodpowiedziane lub czerwone",
};

export function PracticeView({ sessionId }: Props) {
  const { recentIds, addRecent, clearRecent } = useRecentQuestions();
  const [filter, setFilter] = useState<QuestionFilter>("all");
  const [current, setCurrent] = useState<{ id: number; question: string } | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState<{ score: number; feedback: string } | null>(null);
  const [referenceAnswer, setReferenceAnswer] = useState("");
  const [pending, setPending] = useState(false);
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [questionStats, setQuestionStats] = useState<{
    avgScore: number;
    weight: number;
    totalAnswers: number;
  } | null>(null);

  const loadStats = async (questionId: number) => {
    try {
      const stats = await getQuestionPracticeStats(sessionId, questionId);
      setQuestionStats(stats);
    } catch {
      setQuestionStats(null);
    }
  };

  const drawQuestion = async () => {
    setLoadingQuestion(true);
    setResult(null);
    setUserAnswer("");
    setReferenceAnswer("");
    setQuestionStats(null);

    try {
      const q = await getFilteredRandomQuestion(sessionId, recentIds, filter);
      if (!q) {
        clearRecent();
        const retry = await getFilteredRandomQuestion(sessionId, [], filter);
        if (retry) {
          setCurrent(retry);
          const full = questions.find((x) => x.id === retry.id);
          setReferenceAnswer(full?.answer ?? "");
          loadStats(retry.id);
        }
      } else {
        setCurrent(q);
        const full = questions.find((x) => x.id === q.id);
        setReferenceAnswer(full?.answer ?? "");
        loadStats(q.id);
      }
    } finally {
      setLoadingQuestion(false);
    }
  };

  const handleCheck = async () => {
    if (!current || !userAnswer.trim()) return;
    setPending(true);

    try {
      const evalResult = await evaluateAnswer(
        current.question,
        referenceAnswer,
        userAnswer
      );

      await saveAnswer(
        sessionId,
        current.id,
        evalResult.score
      );

      await updateWeight(sessionId, current.id, evalResult.score);

      setResult(evalResult);
      addRecent(current.id);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Nie udało się ocenić odpowiedzi.";
      setResult({ score: 1, feedback: msg });
    } finally {
      setPending(false);
    }
  };

  const handleSkip = async () => {
    if (!current) return;
    await skipQuestion(sessionId, current.id);
    addRecent(current.id);
    drawQuestion();
  };

  return (
    <div className="space-y-6">
      {!current && (
        <div className="text-center py-12 space-y-4">
          <p className="text-muted-foreground">
            Kliknij poniżej, aby wylosować pytanie.
          </p>

          <div className="flex items-center justify-center gap-3">
            <Select value={filter} onValueChange={(v) => setFilter(v as QuestionFilter)}>
              <SelectTrigger className="w-56">
                <span>{filterLabels[filter]}</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Wszystkie pytania</SelectItem>
                <SelectItem value="unanswered">Tylko nieodpowiedziane</SelectItem>
                <SelectItem value="red">Tylko czerwone</SelectItem>
                <SelectItem value="unanswered_or_red">Nieodpowiedziane lub czerwone</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={drawQuestion} disabled={loadingQuestion} size="lg">
              {loadingQuestion ? "Losowanie..." : "Losuj pytanie"}
            </Button>
          </div>
        </div>
      )}

      {current && (
        <>
          {questionStats && questionStats.totalAnswers > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Info className="h-4 w-4" />
              <span>
                Średnia: <strong>{questionStats.avgScore}</strong> / 5
              </span>
              <span className="text-muted-foreground/50">|</span>
              <span>
                Waga: <strong>{questionStats.weight}</strong>
              </span>
              <span className="text-muted-foreground/50">|</span>
              <span>
                Odpowiedzi: <strong>{questionStats.totalAnswers}</strong>
              </span>
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-xl leading-relaxed">
                {current.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!result && (
                <>
                  <Textarea
                    placeholder="Wpisz swoją odpowiedź..."
                    className="min-h-[200px] resize-y"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                  />
                  <div className="flex gap-3">
                    <Button
                      onClick={handleCheck}
                      disabled={pending || !userAnswer.trim()}
                      className="flex-1"
                    >
                      {pending ? "Ocenianie..." : "Sprawdź odpowiedź"}
                    </Button>
                    <Button
                      onClick={handleSkip}
                      variant="outline"
                      disabled={pending}
                    >
                      Pomiń
                    </Button>
                  </div>
                </>
              )}

              {result && <ResultCard result={result} referenceAnswer={referenceAnswer} />}
            </CardContent>
          </Card>

          {result && (
            <div className="text-center">
              <Button onClick={drawQuestion} size="lg">
                Następne pytanie
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
