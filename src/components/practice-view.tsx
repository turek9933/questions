"use client";

import { useState } from "react";
import { useRecentQuestions } from "@/hooks/use-recent-questions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ResultCard } from "@/components/result-card";
import { getWeightedRandomQuestion, skipQuestion, updateWeight } from "@/lib/actions/questions";
import { evaluateAnswer } from "@/lib/actions/evaluate";
import { saveAnswer } from "@/lib/actions/answers";
import { questions } from "@/data/questions";

interface Props {
  sessionId: string;
}

export function PracticeView({ sessionId }: Props) {
  const { recentIds, addRecent, clearRecent } = useRecentQuestions();
  const [current, setCurrent] = useState<{ id: number; question: string } | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState<{ score: number; feedback: string } | null>(null);
  const [referenceAnswer, setReferenceAnswer] = useState("");
  const [pending, setPending] = useState(false);
  const [loadingQuestion, setLoadingQuestion] = useState(false);

  const drawQuestion = async () => {
    setLoadingQuestion(true);
    setResult(null);
    setUserAnswer("");
    setReferenceAnswer("");

    try {
      const q = await getWeightedRandomQuestion(sessionId, recentIds);
      if (!q) {
        clearRecent();
        const retry = await getWeightedRandomQuestion(sessionId, []);
        if (retry) {
          setCurrent(retry);
          const full = questions.find((x) => x.id === retry.id);
          setReferenceAnswer(full?.answer ?? "");
        }
      } else {
        setCurrent(q);
        const full = questions.find((x) => x.id === q.id);
        setReferenceAnswer(full?.answer ?? "");
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
        userAnswer,
        evalResult.score,
        evalResult.feedback
      );

      await updateWeight(sessionId, current.id, evalResult.score);

      setResult(evalResult);
      addRecent(current.id);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Nie udało się ocenić odpowiedzi.";
      setResult({ score: 0, feedback: msg });
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
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            Kliknij poniżej, aby wylosować pytanie.
          </p>
          <Button onClick={drawQuestion} disabled={loadingQuestion} size="lg">
            {loadingQuestion ? "Losowanie..." : "Losuj pytanie"}
          </Button>
        </div>
      )}

      {current && (
        <>
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
