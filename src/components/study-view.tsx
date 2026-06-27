"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ResultCard } from "@/components/result-card";
import { drawStudyQuestions, pickFromCandidates, skipQuestion, updateWeight, getWeights } from "@/lib/actions/questions";
import { evaluateAnswer } from "@/lib/actions/evaluate";
import { saveAnswer } from "@/lib/actions/answers";
import { BookOpen, CheckCircle2 } from "lucide-react";

interface StudyQuestion {
  id: number;
  question: string;
  answer: string;
}

interface AnswerItem {
  question: StudyQuestion;
  userAnswer: string;
  result: { score: number; feedback: string } | null;
  pending: boolean;
}

interface AnswerResult {
  questionId: number;
  question: string;
  score: number;
  feedback: string;
}

interface Props {
  sessionId: string;
}

type Stage = "start" | "reading" | "answering" | "done";

export function StudyView({ sessionId }: Props) {
  const [stage, setStage] = useState<Stage>("start");
  const [studyQuestions, setStudyQuestions] = useState<StudyQuestion[]>([]);
  const [answerItems, setAnswerItems] = useState<AnswerItem[]>([]);
  const [results, setResults] = useState<AnswerResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    setLoading(true);
    try {
      const drawn = await drawStudyQuestions(sessionId, 5);
      setStudyQuestions(drawn);

      const weights = await getWeights(sessionId);
      const candidates = drawn.map((q) => ({
        ...q,
        weight: weights[q.id] ?? 1.0,
      }));

      const picked1 = await pickFromCandidates(
        candidates.map((c) => ({ id: c.id, weight: c.weight }))
      );

      const remaining1 = candidates.filter((c) => c.id !== picked1);
      const picked2 =
        remaining1.length > 0
          ? await pickFromCandidates(
              remaining1.map((c) => ({ id: c.id, weight: c.weight }))
            )
          : null;

      const pickedIds = [picked1, picked2].filter(
        (id): id is number => id !== null
      );

      const answerQuestions = candidates.filter((c) =>
        pickedIds.includes(c.id)
      );

      setAnswerItems(
        answerQuestions.map((q) => ({
          question: { id: q.id, question: q.question, answer: q.answer },
          userAnswer: "",
          result: null,
          pending: false,
        }))
      );

      setStage("reading");
    } finally {
      setLoading(false);
    }
  };

  const handleStartAnswering = () => {
    setStage("answering");
  };

  const handleCheck = async (index: number) => {
    const item = answerItems[index];
    if (!item || !item.userAnswer.trim()) return;

    setAnswerItems((prev) =>
      prev.map((it, i) => (i === index ? { ...it, pending: true } : it))
    );

    try {
      const evalResult = await evaluateAnswer(
        item.question.question,
        item.question.answer,
        item.userAnswer
      );

      await saveAnswer(
        sessionId,
        item.question.id,
        evalResult.score
      );

      await updateWeight(sessionId, item.question.id, evalResult.score);

      setAnswerItems((prev) =>
        prev.map((it, i) =>
          i === index
            ? { ...it, result: evalResult, pending: false }
            : it
        )
      );

      setResults((prev) => [
        ...prev,
        {
          questionId: item.question.id,
          question: item.question.question,
          score: evalResult.score,
          feedback: evalResult.feedback,
        },
      ]);
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "Nie udało się ocenić odpowiedzi.";
      setAnswerItems((prev) =>
        prev.map((it, i) =>
          i === index
            ? {
                ...it,
                result: { score: 1, feedback: msg },
                pending: false,
              }
            : it
        )
      );
    }
  };

  const handleSkip = async (index: number) => {
    const item = answerItems[index];
    if (!item) return;
    await skipQuestion(sessionId, item.question.id);
    setAnswerItems((prev) =>
      prev.map((it, i) =>
        i === index
          ? {
              ...it,
              userAnswer: "",
              result: { score: 1, feedback: "Pominięte" },
            }
          : it
      )
    );
  };

  const allChecked = answerItems.every((item) => item.result !== null);

  if (stage === "start") {
    return (
      <div className="text-center py-12">
        <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h2 className="text-xl font-semibold mb-2">Tryb nauki</h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Najpierw przeczytasz 5 pytań wraz z odpowiedziami. Następnie z tej puli
          wylosowane zostaną 2 pytania, na które odpowiesz.
        </p>
        <Button onClick={handleStart} disabled={loading} size="lg">
          {loading ? "Przygotowywanie..." : "Rozpocznij naukę"}
        </Button>
      </div>
    );
  }

  if (stage === "reading") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <BookOpen className="h-4 w-4" />
          <span>
            Zapoznaj się z {studyQuestions.length} pytaniami i odpowiedziami
          </span>
        </div>

        <div className="space-y-4">
          {studyQuestions.map((q, i) => (
            <Card key={q.id}>
              <CardHeader>
                <CardTitle className="text-base leading-relaxed">
                  <span className="text-xs font-mono text-muted-foreground mr-2">
                    #{i + 1}
                  </span>
                  {q.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Odpowiedź:
                  </p>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {q.answer}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button onClick={handleStartAnswering} size="lg">
            Rozpocznij odpowiedzi
          </Button>
        </div>
      </div>
    );
  }

  if (stage === "answering") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CheckCircle2 className="h-4 w-4" />
          <span>
            Odpowiedz na {answerItems.length} pytania
          </span>
        </div>

        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
          {answerItems.map((item, index) => (
            <Card key={item.question.id}>
              <CardHeader>
                <CardTitle className="text-lg leading-relaxed">
                  Pytanie {index + 1}
                  <br />
                  <span className="text-sm font-normal text-muted-foreground mt-1 block">
                    {item.question.question}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!item.result && (
                  <>
                    <Textarea
                      placeholder="Wpisz swoją odpowiedź..."
                      className="min-h-[160px] resize-y"
                      value={item.userAnswer}
                      onChange={(e) =>
                        setAnswerItems((prev) =>
                          prev.map((it, i) =>
                            i === index
                              ? { ...it, userAnswer: e.target.value }
                              : it
                          )
                        )
                      }
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleCheck(index)}
                        disabled={item.pending || !item.userAnswer.trim()}
                        className="flex-1"
                      >
                        {item.pending ? "Ocenianie..." : "Sprawdź"}
                      </Button>
                      <Button
                        onClick={() => handleSkip(index)}
                        variant="outline"
                        disabled={item.pending}
                      >
                        Pomiń
                      </Button>
                    </div>
                  </>
                )}

                {item.result && (
                  <ResultCard
                    result={item.result}
                    referenceAnswer={item.question.answer}
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {allChecked && (
          <div className="text-center">
            <Button onClick={() => setStage("done")} size="lg">
              Zobacz podsumowanie
            </Button>
          </div>
        )}
      </div>
    );
  }

  const avgScore =
    results.length > 0
      ? results.reduce((s, r) => s + r.score, 0) / results.length
      : 0;

  return (
    <div className="text-center py-8 space-y-6">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-700">
        <CheckCircle2 className="h-8 w-8" />
      </div>

      <div>
        <h2 className="text-xl font-semibold">Nauka zakończona!</h2>
        <p className="text-muted-foreground mt-1">
          Odpowiedziałeś na {results.length} pytanie
          {results.length !== 1 ? "ń" : ""}.
        </p>
      </div>

      {results.length > 0 && (
        <div className="max-w-md mx-auto space-y-3">
          <p className="text-3xl font-bold">
            {avgScore.toFixed(1)}
            <span className="text-lg font-normal text-muted-foreground">
              {" "}
              / 5
            </span>
          </p>

          <div className="space-y-2">
            {results.map((r) => (
              <div
                key={r.questionId}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <p className="truncate flex-1 text-left">{r.question}</p>
                <Badge
                  className={
                    r.score >= 4
                      ? "bg-green-100 text-green-800 shrink-0"
                      : r.score >= 3
                        ? "bg-yellow-100 text-yellow-800 shrink-0"
                        : "bg-red-100 text-red-800 shrink-0"
                  }
                >
                  {r.score}/5
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      <Button onClick={handleStart} size="lg">
        Rozpocznij kolejną sesję
      </Button>
    </div>
  );
}
