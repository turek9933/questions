"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { EvaluateResult } from "@/lib/types";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY environment variable");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function evaluateAnswer(
  question: string,
  referenceAnswer: string,
  userAnswer: string
): Promise<EvaluateResult> {
  const model = genAI.getGenerativeModel({
    model: "gemini-3.1-flash-lite",
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 1024,
    },
  });

  const prompt = `Oceń odpowiedź studenta na pytanie egzaminacyjne.

Pytanie: ${question}

Wzorcowa odpowiedź: ${referenceAnswer}

Odpowiedź studenta: ${userAnswer}

Zwróć WYŁĄCZNIE obiekt JSON, bez żadnego innego tekstu:
{"score": liczba od 1 do 5, "feedback": "krótkie uzasadnienie po polsku"}`;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      const raw = result.response.text();

      const jsonMatch = raw.match(/\{[\s\S]*"score"[\s\S]*"feedback"[\s\S]*\}/);
      if (!jsonMatch) {
        lastError = new Error("Brak JSON w odpowiedzi Gemini");
        continue;
      }

      const clean = jsonMatch[0].replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
      const parsed = JSON.parse(clean) as EvaluateResult;

      if (
        typeof parsed.score === "number" &&
        parsed.score >= 1 &&
        parsed.score <= 5 &&
        typeof parsed.feedback === "string"
      ) {
        return parsed;
      }

      lastError = new Error("Nieprawidłowy format JSON z Gemini");
    } catch (e) {
      const msg = String(e);
      if (msg.includes("429") || msg.includes("Too Many Requests") || msg.includes("quota")) {
        throw new Error("Limit zapytań do Gemini wyczerpany. Spróbuj za chwilę.");
      }
      lastError = e instanceof Error ? e : new Error(msg);
    }
  }

  throw lastError || new Error("Błąd oceny odpowiedzi");
}
