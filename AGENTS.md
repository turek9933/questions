# AGENTS.md — Questions App

## Tech Stack
- **Framework:** Next.js 16+ (App Router), TypeScript
- **UI:** TailwindCSS v4 + shadcn/ui (oparty na @base-ui/react)
- **Database:** Turso (@libsql/client) — chmurowy SQLite
- **AI:** Google Gemini 2.0 Flash API (@google/generative-ai)
- **Package Manager:** Bun

## Project Structure
```
src/
├── app/
│   ├── layout.tsx              # Root layout z Toaster (sonner)
│   ├── page.tsx                # Home: wybór sesji (serwer)
│   └── session/
│       └── [id]/
│           └── page.tsx        # Strona sesji (serwer → klient)
├── components/
│   ├── ui/                     # shadcn/ui (autogenerowane)
│   ├── session-picker.tsx      # Lista sesji + tworzenie
│   ├── session-page-client.tsx # Layout z Tabs (4 zakładki)
│   ├── practice-view.tsx       # Tryb losowania pytań
│   ├── result-card.tsx         # Wynik oceny Gemini
│   ├── review-view.tsx         # Lista wszystkich pytań
│   ├── stats-view.tsx          # Statystyki sesji
│   └── settings-view.tsx       # Reset/usuwanie sesji
├── data/
│   └── questions.ts            # Hardcoded pytania (Question[])
├── hooks/
│   └── use-recent-questions.ts # Hook: 5 ostatnich pytań
└── lib/
    ├── types.ts                # TypeScript interfejsy
    ├── db.ts                   # Klient Turso (serwer-only)
    └── actions/
        ├── sessions.ts         # CRUD sesji
        ├── questions.ts        # Losowanie + wagi
        ├── evaluate.ts         # Wywołanie Gemini
        └── answers.ts          # Zapisywanie + statystyki
```

## Database Schema (Turso — uruchom przez `turso db shell`)
Patrz: `sql/migration.sql`

## Zasady (ważne!)
1. **Zero `asChild`** — shadcn/ui v4 używa @base-ui/react, które wspiera `render` zamiast `asChild`
2. **Server Actions tylko** — cała komunikacja z Turso i Gemini przez Server Actions (`'use server'`)
3. **Env vars tylko po stronie serwera** — TURSO_DATABASE_URL, TURSO_AUTH_TOKEN, GEMINI_API_KEY czytane przez `process.env` w Server Actions
4. **isPending blokada** — przycisk "Sprawdź odpowiedź" blokowany przez stan pending (`useActionState` lub `useTransition`)
5. **Wzorzec wag** — score 8-10: ×0.4, 5-7: ×0.7, 0-4: ×1.2, pominięcie: ×1.2, minimum: 0.05

## UI Konwencje
- Język: polski
- score ≥ 8: zielony badge (`bg-green-100 text-green-800 border-green-300`)
- score 5-7: żółty badge (`bg-yellow-100 text-yellow-800 border-yellow-300`)
- score < 5: czerwony badge (`bg-red-100 text-red-800 border-red-300`)
- Wynik wyświetlany jako `text-6xl font-bold`

## Komendy lokalne
```bash
bun install
bun run dev        # http://localhost:3000
bun run build      # test build
bun run lint       # eslint
```
