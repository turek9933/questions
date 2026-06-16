# Plan aplikacji: Powtarzanie pytań do obrony inżynierskiej

## 1. Cel projektu

Aplikacja webowa do powtarzania otwartych pytań i odpowiedzi przed egzaminem. Losuje pytania z ważoną pulą (żeby pokryć wszystkie pytania równomiernie), przyjmuje odpowiedź użytkownika, ocenia ją przez LLM i zapisuje statystyki. Sesje i statystyki zapisywane w chmurowej bazie SQLite (Turso) — dostępne z każdego urządzenia po wybraniu nazwy sesji. Brak logowania, brak haseł.

---

## 2. Założenia wstępne

- 67 pytań i odpowiedzi wzorcowych **hardcoded** w pliku źródłowym aplikacji — brak kategorii, jedna wspólna pula
- Dane sesji (wagi, statystyki) zapisywane w **Turso** (chmurowy SQLite dostępny przez HTTP)
- Sesja identyfikowana przez nazwę nadaną przez użytkownika (np. `makroniiii`) — brak kont, brak haseł
- Wiele urządzeń może korzystać z tej samej sesji — dane zsynchronizowane, bo żyją w jednym miejscu (Turso)
- Ocena odpowiedzi przez zewnętrzne LLM API (Gemini 1.5 Flash, darmowy tier)
- Wzorcowe odpowiedzi przesyłane do LLM w całości — odpowiedzi są wystarczająco krótkie, żeby nie stanowiło to problemu
- Klucz Gemini API i dane dostępowe do Turso chronione przez **Netlify Functions** — nie trafiają do przeglądarki
- Hosting na **Netlify** (bezkosztowy, globalny)
- Interfejs w języku **polskim**

---

## 3. Stack technologiczny

| Warstwa | Technologia | Uzasadnienie |
|---|---|---|
| Front-end framework | React + Vite | Prosta SPA, szybki development |
| Stylowanie | TailwindCSS | Szybkie budowanie UI bez pisania CSS |
| Baza danych | Turso (chmurowy SQLite) | Darmowy, dostępny z każdego urządzenia przez HTTP, brak konfiguracji serwera |
| Klient Turso po stronie Functions | `@libsql/client` | Oficjalny klient Turso dla Node.js |
| API warstwy pośredniej | Netlify Functions | Ukrywa klucze API, obsługuje zapytania do Turso i Gemini |
| Ocena odpowiedzi | Gemini 1.5 Flash API | Darmowy tier: 1500 req/dzień, dobra jakość oceniania |
| Hosting | Netlify | Bezkosztowy, globalny CDN, automatyczny deploy z GitHub |
| Język | TypeScript | Bezpieczeństwo typów |

---

## 4. Struktura danych

### 4.1 Pytania (hardcoded, plik `src/data/questions.ts`)

```typescript
interface Question {
  id: number;
  question: string;
  answer: string;   // wzorcowa odpowiedź, przesyłana w całości do LLM
}
```

Przykładowy wpis:

```typescript
{
  id: 44,
  question: "Elementy i funkcje jądra systemu zarządzania BD.",
  answer: `Jądro systemu zarządzania bazą danych odpowiada za wszystkie podstawowe operacje na danych.
Procesor zapytań przetwarza zapytania w trzech etapach: analiza składni, optymalizator, wykonanie planu.
Menedżer pamięci zarządza pamięcią podręczną i minimalizuje odczyty z dysku. [...]`
}
```

### 4.2 Schemat bazy Turso (SQLite)

```sql
CREATE TABLE sessions (
  id        TEXT PRIMARY KEY,   -- UUID
  name      TEXT NOT NULL,      -- nazwa sesji, np. "makroniiii"
  created_at INTEGER NOT NULL,
  last_used_at INTEGER NOT NULL
);

CREATE TABLE question_weights (
  session_id  TEXT NOT NULL,
  question_id INTEGER NOT NULL,
  weight      REAL NOT NULL DEFAULT 1.0,
  PRIMARY KEY (session_id, question_id),
  FOREIGN KEY (session_id) REFERENCES sessions(id)
);

CREATE TABLE answer_records (
  id          TEXT PRIMARY KEY,  -- UUID
  session_id  TEXT NOT NULL,
  question_id INTEGER NOT NULL,
  user_answer TEXT NOT NULL,
  score       INTEGER NOT NULL,  -- 0–10
  feedback    TEXT NOT NULL,
  answered_at INTEGER NOT NULL,
  FOREIGN KEY (session_id) REFERENCES sessions(id)
);
```

---

## 5. Logika wag i losowania

### 5.1 Stan początkowy

Przy tworzeniu nowej sesji wszystkie 67 pytań dostaje wagę `1.0` — wstawiane jako batch do tabeli `question_weights`.

### 5.2 Losowanie

Losowanie odbywa się po stronie front-endu. Przy wejściu na ekran pytania front pobiera aktualne wagi wszystkich pytań z API (`GET /api/sessions/:id/weights`) i losuje proporcjonalnie do wagi:

```
prawdopodobieństwo(pytanie_i) = waga_i / suma_wszystkich_wag
```

### 5.3 Aktualizacja wagi po odpowiedzi

| Wynik LLM | Zmiana wagi |
|---|---|
| 8–10 (dobra odpowiedź) | waga × 0.4 |
| 5–7 (częściowa) | waga × 0.7 |
| 0–4 (słaba) | waga × 1.2 |
| Pominięcie ("Pomiń") | waga × 1.2 |

Waga nie spada poniżej `0.05` (pytanie nigdy całkowicie nie znika z puli).

### 5.4 Reset wag

Użytkownik może zresetować wagi do `1.0` z poziomu ustawień sesji.

---

## 6. Ocena odpowiedzi przez LLM

### 6.1 Przepływ

1. Użytkownik wpisuje odpowiedź i klika "Sprawdź"
2. Front wysyła `POST /api/evaluate` do Netlify Function z: treścią pytania, wzorcową odpowiedzią (w całości), odpowiedzią użytkownika
3. Netlify Function dodaje klucz Gemini API i wywołuje Gemini
4. Gemini zwraca `{ score: number, feedback: string }`
5. Front wysyła `POST /api/sessions/:id/answers` zapisując wynik do Turso i aktualizując wagę pytania
6. Wyświetlany jest wynik i feedback

### 6.2 Prompt dla LLM

```
Jesteś egzaminatorem na egzaminie inżynierskim z informatyki.

Pytanie: {question}
Wzorcowa odpowiedź: {referenceAnswer}
Odpowiedź studenta: {userAnswer}

Oceń odpowiedź studenta w skali 0–10, biorąc pod uwagę:
- Czy student rozumie pojęcie (nie wymaga dosłownego cytowania)
- Czy kluczowe elementy są obecne
- Czy nie ma rażących błędów merytorycznych

Odpowiedz WYŁĄCZNIE w formacie JSON, bez żadnego tekstu przed ani po:
{"score": <liczba 0-10>, "feedback": "<1-2 zdania uzasadnienia po polsku>"}
```

### 6.3 Obsługa błędów

- Brak internetu / timeout → tryb manualny: użytkownik sam ocenia odpowiedź suwakiem 0–10
- Błąd parsowania JSON z Gemini → ponowna próba, max 2 razy, potem tryb manualny

---

## 7. Widoki aplikacji

### 7.1 Ekran startowy — wybór sesji
- Lista istniejących sesji (nazwa, data ostatniego użycia, liczba udzielonych odpowiedzi)
- Przycisk "Nowa sesja" → input z nazwą → tworzy sesję i inicjalizuje wagi
- Przycisk "Usuń sesję" przy każdej istniejącej (z potwierdzeniem)

### 7.2 Ekran główny — pytanie
- Wylosowane pytanie
- Dwa tryby (przełącznik):
  - **Tryb odpowiadania** — textarea na odpowiedź, przyciski "Pomiń" i "Sprawdź"
  - **Tryb przeglądania** — same pytania bez odpowiadania, przyciski "Pokaż odpowiedź" i "Następne"
- W trybie przeglądania wagi nie są modyfikowane

### 7.3 Ekran wyniku (tylko tryb odpowiadania)
- Wynik (0–10) z wizualnym wskaźnikiem (kolor zależny od wyniku)
- Feedback od LLM
- Wzorcowa odpowiedź (rozwijana sekcja, domyślnie ukryta)
- Przycisk "Następne pytanie"

### 7.4 Statystyki sesji
- Liczba udzielonych odpowiedzi łącznie
- Średni wynik ogółem
- Pokrycie puli (ile z 67 pytań miało co najmniej jedną odpowiedź)
- Lista pytań z najniższymi średnimi wynikami
- Histogram wyników (rozkład ocen 0–10)

### 7.5 Ustawienia sesji
- Reset wag do `1.0`
- Usunięcie sesji

---

## 8. Netlify Functions — API

Wszystkie funkcje w katalogu `netlify/functions/`. Klucze API i dane Turso jako zmienne środowiskowe Netlify (runtime).

| Endpoint | Metoda | Opis |
|---|---|---|
| `/api/sessions` | GET | Lista wszystkich sesji |
| `/api/sessions` | POST | Utwórz nową sesję + zainicjuj wagi |
| `/api/sessions/:id` | DELETE | Usuń sesję i jej dane |
| `/api/sessions/:id/weights` | GET | Pobierz wagi pytań dla sesji |
| `/api/sessions/:id/weights` | PATCH | Zaktualizuj wagę jednego pytania |
| `/api/sessions/:id/answers` | POST | Zapisz wynik odpowiedzi |
| `/api/sessions/:id/stats` | GET | Pobierz statystyki sesji |
| `/api/evaluate` | POST | Ocena odpowiedzi przez Gemini |

---

## 9. Infrastruktura i konta do przygotowania

Przed rozpoczęciem implementacji należy założyć i skonfigurować:

**GitHub**
- Repozytorium projektu (publiczne lub prywatne)

**Netlify** — `netlify.com`
- Konto darmowe
- Połączenie z repozytorium GitHub
- Zmienne środowiskowe (w panelu Netlify → Site settings → Environment variables):
  - `TURSO_DATABASE_URL` — URL bazy Turso
  - `TURSO_AUTH_TOKEN` — token dostępu do Turso
  - `GEMINI_API_KEY` — klucz Gemini API

**Turso** — `turso.tech`
- Konto darmowe (limit: 500 baz, 9 GB storage — praktycznie nieograniczony dla tego projektu)
- Utworzona baza danych (przez CLI lub panel)
- Wygenerowany token dostępu (`turso db tokens create <nazwa-bazy>`)

**Google AI Studio** — `aistudio.google.com`
- Konto Google
- Wygenerowany klucz API do Gemini Flash (bezpłatny)

---

## 10. Hosting i limity

- Deploy: automatyczny przy każdym push do brancha `main`
- Domena: domyślna Netlify (`*.netlify.app`) lub własna
- HTTPS: automatyczny

**Limity darmowego planu Netlify:**
- 100 GB transferu / miesiąc
- 125 000 wywołań Functions / miesiąc

**Limity darmowego planu Turso:**
- 500 baz danych
- 9 GB storage
- 1 miliard rowów odczytanych / miesiąc

**Limity Gemini 1.5 Flash (darmowy tier):**
- 1 500 requestów / dzień
- 15 requestów / minutę

Przy kilku użytkownikach i kilkudziesięciu odpowiedziach dziennie żaden z powyższych limitów nie jest osiągalny.

---

## 11. Struktura projektu

```
/
├── netlify/
│   └── functions/
│       ├── sessions.ts          # GET /api/sessions, POST /api/sessions
│       ├── session.ts           # DELETE /api/sessions/:id
│       ├── weights.ts           # GET, PATCH /api/sessions/:id/weights
│       ├── answers.ts           # POST /api/sessions/:id/answers
│       ├── stats.ts             # GET /api/sessions/:id/stats
│       └── evaluate.ts          # POST /api/evaluate (proxy Gemini)
├── src/
│   ├── data/
│   │   └── questions.ts         # 67 pytań i odpowiedzi (hardcoded)
│   ├── api/
│   │   └── client.ts            # funkcje wywołujące Netlify Functions
│   ├── components/
│   │   ├── SessionPicker.tsx
│   │   ├── QuestionCard.tsx
│   │   ├── AnswerInput.tsx
│   │   ├── ResultCard.tsx
│   │   └── StatsView.tsx
│   ├── hooks/
│   │   ├── useSession.ts        # zarządzanie aktywną sesją
│   │   ├── useWeightedRandom.ts # logika losowania po stronie frontu
│   │   └── useEvaluate.ts       # wywołanie /api/evaluate
│   ├── App.tsx
│   └── main.tsx
├── netlify.toml
├── vite.config.ts
└── package.json
```

---

## 12. Szacowany nakład pracy

| Etap | Czas |
|---|---|
| Setup projektu (Vite, Tailwind, Netlify, Turso) | ~1h |
| Schemat bazy i migracja początkowa | ~1h |
| Netlify Functions (sesje, wagi, odpowiedzi, statystyki) | ~3h |
| Integracja Gemini (evaluate function) | ~1h |
| Logika wag i losowania (front) | ~1h |
| Widoki (SessionPicker, QuestionCard, ResultCard) | ~3h |
| Widok statystyk | ~2h |
| Testy manualne i poprawki | ~2h |
| **Łącznie** | **~14h** |
