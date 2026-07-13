# Questions

<i>Tomasz Turek\
2026</i>

> Aplikacja powstała w ramach eksperymentu z **klimatycznym programowaniem** (eng. vibe-coding) — niemal cała została wygenerowana przy użyciu **opencode** z modelem **DeepSeek V4 Flash Free**.
> This app was created as a **vibe-coding** experiment — almost fully generated using **opencode** with the **DeepSeek V4 Flash Free** model.

[Polski](#questions-1) | [English](#questions-2)


# Questions

# Spis treści

- [Opis](#opis)
- [Funkcjonalności](#funkcjonalności)
- [Architektura](#architektura)
- [Co zostało zrealizowane](#co-zostało-zrealizowane)
- [Instalacja](#instalacja)
  - [Wymagania wstępne](#wymagania-wstępne)
  - [Uruchomienie lokalne](#uruchomienie-lokalne)
  - [Docker](#docker)
- [Zmienne środowiskowe](#zmienne-środowiskowe)
- [Budowanie](#budowanie)
- [Testy](#testy)
- [Schemat bazy danych](#schemat-bazy-danych)
- [Technologie](#technologie)


## Opis

**Questions** to webowa aplikacja do powtarzania pytań egzaminacyjnych przed egzaminem inżynierskim. Umożliwia tworzenie sesji nauki, losowanie pytań z ważoną pulą (słabsze pytania pojawiają się częściej), ocenę odpowiedzi przez AI (np. Gemini - darmowy model do oceny) oraz śledzenie postępów w statystykach.

Aplikacja została zbudowana z myślą o samodzielnym hostowaniu, stąd dołączona jest konfiguracja Docker.


## Funkcjonalności

- **Wielosesyjność** — twórz osobne sesje dla różnych przedmiotów, podejść lub osób.
- **Losowanie ważone** — algorytm wag zwiększa prawdopodobieństwo pytań ze słabszymi wynikami (×0.4 dla dobrych, ×0.7 dla średnich, ×1.2 dla słabych i x1.1 dla pominiętych).
- **Ocena przez AI** — odpowiedź oceniana przez AI w skali 1–5 z informacją zwrotną, model wdrożony w produkcji to Google Gemini 3.1 Flash Lite.
- **Tryb nauki** — przeczytaj 5 pytań z odpowiedziami, następnie odpowiedz na 2 wylosowane z tej puli.
- **Lista pytań** — przeglądaj wszystkie pytania z filtrowaniem (wg stanu, koloru) i sortowaniem (ID, ocena, waga).
- **Statystyki sesji** — średni wynik, histogram, pokrycie puli, najsłabsze pytania.
- **Statystyki globalne** — podsumowanie wszystkich sesji z sortowaniem i filtrowaniem.
- **Wagi dynamiczne** — automatyczna korekta wag po każdej odpowiedzi.
- **Responsywny UI** — dostosowany do urządzeń mobilnych i desktopowych (TailwindCSS).
- **PWA-ready** — manifest i ikony pozwalają na zapisanie jako aplikacja.


## Architektura

```
questions/
├── src/
│   ├── app/               # Next.js App Router (strony)
│   │   ├── layout.tsx     # Root layout z Toaster
│   │   ├── page.tsx       # Strona główna: wybór sesji
│   │   ├── stats/         # Statystyki globalne (nowość)
│   │   └── session/[id]/  # Strona sesji
│   ├── components/
│   │   ├── ui/            # shadcn/ui (autogenerowane)
│   │   ├── session-picker.tsx
│   │   ├── session-page-client.tsx
│   │   ├── practice-view.tsx
│   │   ├── study-view.tsx
│   │   ├── review-view.tsx
│   │   ├── stats-view.tsx
│   │   ├── global-stats-view.tsx
│   │   ├── result-card.tsx
│   │   └── settings-view.tsx
│   ├── data/questions.ts  # 67 pytań egzaminacyjnych
│   ├── hooks/             # useRecentQuestions
│   └── lib/
│       ├── types.ts         # Interfejsy TypeScript
│       ├── db.ts            # Klient Turso
│       ├── weighted-pick.ts # (nowość) czysta logika wag
│       └── actions/         # Server Actions
│           ├── sessions.ts
│           ├── questions.ts
│           ├── answers.ts
│           └── evaluate.ts
├── sql/migration.sql      # Schema Turso
├── Dockerfile             # multi-stage build
└── docker-compose.yml
```

### Podział odpowiedzialności

- **Server Actions** (`src/lib/actions/`) — cała komunikacja z Turso i Gemini odbywa się wyłącznie po stronie serwera przez `'use server'`.
- **Pure logic** (`src/lib/weighted-pick.ts`) — czyste funkcje do testowania, bez zależności od bazy.
- **Client components** — stan UI, formularze, widoki.


## Co zostało zrealizowane

- system wielosesyjny z CRUD
- ważone losowanie pytań z filtrowaniem (wszystkie, nieodpowiedziane, czerwone, nieodpowiedziane lub czerwone)
- ocena odpowiedzi przez Gemini z automatycznym ponawianiem i walidacją JSON
- aktualizacja wag po każdej odpowiedzi / pominięciu
- tryb nauki (read → answer)
- statystyki sesji (średnia, histogram, najsłabsze pytania)
- statystyki globalne (wszystkie sesje) z sortowaniem i filtrowaniem
- reset i usuwanie sesji
- responsive UI (TailwindCSS + shadcn/ui)
- PWA manifest
- konteneryzacja Docker
- testy jednostkowe logiki wag (16 testów)


## Instalacja

### Wymagania wstępne

- Node.js 20+ **lub** Bun 1.2+
- Konto [Turso](https://turso.tech) — chmurowa baza SQLite
- Klucz API [Google Gemini](https://aistudio.google.com)
- **Opcjonalnie:** Docker

### Uruchomienie lokalne

1. **Sklonuj repozytorium:**
   ```bash
   git clone https://github.com/turek9933/questions.git
   cd questions
   ```

2. **Zainstaluj zależności:**
   ```bash
   bun install
   ```

3. **Skonfiguruj zmienne środowiskowe** (patrz sekcja niżej).

4. **Utwórz tabele w Turso:**
   ```bash
   turso db shell <nazwa-bazy> < sql/migration.sql
   ```

5. **Uruchom serwer deweloperski:**
   ```bash
   bun run dev
   ```
   Aplikacja będzie dostępna pod `http://localhost:3005`.

### Docker

```bash
# Budowanie obrazu
docker compose build

# Uruchomienie (wymaga zmiennych środowiskowych - pliku .env)
export TURSO_DATABASE_URL=libsql://...
export TURSO_AUTH_TOKEN=eyJquaz...
export GEMINI_API_KEY=AIquaz...
docker compose up -d
```

Aplikacja będzie dostępna na porcie `3005`.

Można też zbudować sam obraz:

```bash
docker build -t questions .
docker run -p 3005:3000 \
  -e TURSO_DATABASE_URL \
  -e TURSO_AUTH_TOKEN \
  -e GEMINI_API_KEY \
  questions
```


## Zmienne środowiskowe

| Zmienna | Opis | Wymagana |
|---|---|---|
| `TURSO_DATABASE_URL` | URL bazy Turso (np. `libsql://nazwa.turso.io`) | Tak |
| `TURSO_AUTH_TOKEN` | Token autoryzacyjny Turso | Tak |
| `GEMINI_API_KEY` | Klucz API Google Gemini | Tak |

Utwórz plik `.env` w katalogu głównym:

```env
TURSO_DATABASE_URL=libsql://twoja-baza.turso.io
TURSO_AUTH_TOKEN=eyJquaz...
GEMINI_API_KEY=AIquaz...
```

Plik `.env` jest ignorowany przez Gita (chroniony w `.gitignore`).


## Budowanie

```bash
bun run build      # Produkcyjny build Next.js
bun run lint       # ESLint
```


## Testy

```bash
bun test
```

Testy pokrywają logikę ważonego losowania, przeliczania wag oraz klampowania (16 testów).


## Schemat bazy danych

Baza: Turso (SQLite). Plik migracji: `sql/migration.sql`.

```sql
-- Sesje (osobne podejścia do nauki)
CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at INTEGER NOT NULL,
  last_used_at INTEGER NOT NULL
);

-- Wagi pytań (dynamicznie aktualizowane)
CREATE TABLE question_weights (
  session_id TEXT NOT NULL,
  question_id INTEGER NOT NULL,
  weight REAL NOT NULL DEFAULT 1.0,
  total_answers INTEGER NOT NULL DEFAULT 0,
  total_score_sum INTEGER NOT NULL DEFAULT 0,
  last_score INTEGER,
  last_answer_at INTEGER,
  PRIMARY KEY (session_id, question_id),
  FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
);

-- Historia odpowiedzi
CREATE TABLE answer_records (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  question_id INTEGER NOT NULL,
  score INTEGER NOT NULL,
  answered_at INTEGER NOT NULL,
  FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
);
```


## Technologie

- **Framework:** Next.js 16 (App Router), TypeScript
- **UI:** TailwindCSS v4, shadcn/ui (@base-ui/react)
- **Database:** Turso (@libsql/client) — cloud SQLite
- **AI:** Google Gemini 3.1 Flash Lite API
- **Package Manager:** Bun
- **Konteneryzacja:** Docker (multi-stage)
- **Testy:** Bun test

---

# Questions

# Table of Contents

- [Description](#description)
- [Features](#features)
- [Architecture](#architecture)
- [What has been implemented](#what-has-been-implemented)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Local setup](#local-setup)
  - [Docker](#docker-1)
- [Environment variables](#environment-variables)
- [Build](#build)
- [Tests](#tests-1)
- [Database schema](#database-schema)
- [Technologies](#technologies-1)

---

## Description

**Questions** is a web application for reviewing exam questions before an engineering degree exam. It allows creating study sessions, drawing questions from a weighted pool (weaker questions appear more often), evaluating answers using AI (eg. Gemini - free model for validation), and tracking progress through statistics.

The app is built with self-hosting in mind, that's why Docker configuration is included.


## Features

- **Multi-session** — create separate sessions for different subjects, approaches, or people.
- **Weighted drawing** — weight algorithm increases probability for questions with poor scores (×0.4 for good, ×0.7 for medium, ×1.2 for poor and x1.1 for skipped).
- **AI evaluation** — answers are evaluated by AI on a 1-5 scale with feedback, has been implemented Google Gemini 3.1 Flash Lite.
- **Study mode** — read 5 questions with answers, then answer 2 randomly drawn from that pool.
- **Question list** — browse all questions with filtering (by status, color) and sorting (ID, score, weight).
- **Session statistics** — average score, histogram, pool coverage, weakest questions.
- **Global statistics** — overview of all sessions with sorting and filtering.
- **Dynamic weights** — automatic weight adjustment after each answer.
- **Responsive UI** — adapted for mobile and desktop (TailwindCSS).
- **PWA-ready** — manifest and icons allow saving as an app.

---

## Architecture

```
questions/
├── src/
│   ├── app/               # Next.js App Router (pages)
│   │   ├── layout.tsx     # Root layout with Toaster
│   │   ├── page.tsx       # Home: session picker
│   │   ├── stats/         # Global statistics
│   │   └── session/[id]/  # Session page
│   ├── components/
│   │   ├── ui/            # shadcn/ui (generated)
│   │   ├── session-picker.tsx
│   │   ├── session-page-client.tsx
│   │   ├── practice-view.tsx
│   │   ├── study-view.tsx
│   │   ├── review-view.tsx
│   │   ├── stats-view.tsx
│   │   ├── global-stats-view.tsx  # (new)
│   │   ├── result-card.tsx
│   │   └── settings-view.tsx
│   ├── data/questions.ts  # 67 exam questions
│   ├── hooks/             # useRecentQuestions
│   └── lib/
│       ├── types.ts         # TypeScript interfaces
│       ├── db.ts            # Turso client
│       ├── weighted-pick.ts # pure weight logic
│       └── actions/         # Server Actions
│           ├── sessions.ts
│           ├── questions.ts
│           ├── answers.ts
│           └── evaluate.ts
├── sql/migration.sql      # Turso schema
├── Dockerfile             # multi-stage build
└── docker-compose.yml
```

### Responsibility split

- **Server Actions** (`src/lib/actions/`) — all Turso and Gemini communication happens server-side via `'use server'`.
- **Pure logic** (`src/lib/weighted-pick.ts`) — pure functions for testing, no database dependencies.
- **Client components** — UI state, forms, views.

---

## What has been implemented

- multi-session system with CRUD
- weighted question drawing with filtering (all, unanswered, red, unanswered or red)
- Gemini answer evaluation with automatic retries and JSON validation
- weight updates after each answer / skip
- study mode (read → answer)
- session statistics (average, histogram, weakest questions)
- global statistics (all sessions) with sorting and filtering
- session reset and deletion
- responsive UI (TailwindCSS + shadcn/ui)
- PWA manifest
- Docker containerization
- unit tests for weight logic (16 tests)


## Installation

### Prerequisites

- Node.js 20+ **or** Bun 1.2+
- [Turso](https://turso.tech) account — cloud SQLite database
- [Google Gemini](https://aistudio.google.com) API key
- **Optional:** Docker

### Local setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/turek9933/questions.git
   cd questions
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

3. **Configure environment variables** (see section below).

4. **Create tables in Turso:**
   ```bash
   turso db shell <database-name> < sql/migration.sql
   ```

5. **Start the development server:**
   ```bash
   bun run dev
   ```
   The app will be available at `http://localhost:3005`.

### Docker

```bash
# Build the image
docker compose build

# Run (requires environment variables)
export TURSO_DATABASE_URL=libsql://...
export TURSO_AUTH_TOKEN=eYquaz...
export GEMINI_API_KEY=AIquaz...
docker compose up -d
```

The application will be available on port `3005`.

You can also build the image directly:

```bash
docker build -t questions .
docker run -p 3005:3000 \
  -e TURSO_DATABASE_URL \
  -e TURSO_AUTH_TOKEN \
  -e GEMINI_API_KEY \
  questions
```


## Environment variables

| Variable | Description | Required |
|---|---|---|
| `TURSO_DATABASE_URL` | Turso database URL (e.g. `libsql://name.turso.io`) | Yes |
| `TURSO_AUTH_TOKEN` | Turso authentication token | Yes |
| `GEMINI_API_KEY` | Google Gemini API key | Yes |

Create a `.env` file in the project root:

```env
TURSO_DATABASE_URL=libsql://your-database.turso.io
TURSO_AUTH_TOKEN=equaz...
GEMINI_API_KEY=AIquaz...
```

The `.env` file is ignored by Git (protected in `.gitignore`).


## Build

```bash
bun run build      # Production Next.js build
bun run lint       # ESLint
```


## Tests

```bash
bun test
```

Tests cover weighted pick logic, weight calculation, and clamping (16 tests).


## Database schema

Database: Turso (SQLite). Migration file: `sql/migration.sql`.

```sql
-- Sessions (separate study approaches)
CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at INTEGER NOT NULL,
  last_used_at INTEGER NOT NULL
);

-- Question weights (dynamically updated)
CREATE TABLE question_weights (
  session_id TEXT NOT NULL,
  question_id INTEGER NOT NULL,
  weight REAL NOT NULL DEFAULT 1.0,
  total_answers INTEGER NOT NULL DEFAULT 0,
  total_score_sum INTEGER NOT NULL DEFAULT 0,
  last_score INTEGER,
  last_answer_at INTEGER,
  PRIMARY KEY (session_id, question_id),
  FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
);

-- Answer history
CREATE TABLE answer_records (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  question_id INTEGER NOT NULL,
  score INTEGER NOT NULL,
  answered_at INTEGER NOT NULL,
  FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
);
```


## Technologies

- **Framework:** Next.js 16 (App Router), TypeScript
- **UI:** TailwindCSS v4, shadcn/ui (@base-ui/react)
- **Database:** Turso (@libsql/client) — cloud SQLite
- **AI:** Google Gemini 3.1 Flash Lite API
- **Package Manager:** Bun
- **Containerization:** Docker (multi-stage)
- **Tests:** Bun test
