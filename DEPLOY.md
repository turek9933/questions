# Deploy na Vercel — instrukcja krok po kroku

## 1. Przygotowanie repozytorium GitHub

```bash
# Zobacz co zmieniło się od ostatniego commita
git status

# Dodaj wszystkie pliki (oprócz .env.local — .gitignore go wyklucza)
git add -A

git commit -m "initial"

# Utwórz repozytorium na github.com i podłącz
git remote add origin https://github.com/TWOJA_NAZWA_UZYTKOWNIKA/questions.git
git push -u origin main
```

## 2. Połącz Vercel z GitHub

1. Wejdź na https://vercel.com
2. Załóż konto (GitHub OAuth — najszybsze)
3. Kliknij **"Add New..." → "Project"**
4. Wybierz repozytorium `questions`
5. Vercel automatycznie wykryje Next.js — **nic nie zmieniaj w ustawieniach**

## 3. Zmienne środowiskowe w Vercel

W sekcji **"Environment Variables"** podczas tworzenia projektu (albo później w **Project Settings → Environment Variables**) dodaj trzy zmienne:

| Nazwa | Wartość | Środowisko |
|---|---|---|
| `TURSO_DATABASE_URL` | `libsql://questions-...turso.io` | Production, Preview, Development |
| `TURSO_AUTH_TOKEN` | `eyJhbGciOiJ...` | Production, Preview, Development |
| `GEMINI_API_KEY` | `AIza...` (lub `AQ.Ab8R...`) | Production, Preview, Development |

**Ważne:** To są zmienne serwerowe (NIE mają prefiksu `NEXT_PUBLIC_`). Vercel wstrzykuje je do `process.env` w Server Actions. Klient (przeglądarka) ich nie widzi.

![Environment Variables w Vercel](https://vercel.com/_static/docs/platform/environment-variables.png)

## 4. Deploy

Kliknij **"Deploy"**. Vercel:
- pobierze kod z GitHub
- uruchomi `next build` (tak samo jak lokalnie)
- opublikuje gotową aplikację pod `https://questions-XXXX.vercel.app`

Każdy kolejny `git push` do `main` automatycznie uruchamia nowy deploy.

## 5. Co się dzieje ze zmiennymi środowiskowymi

```
.env.local (twój lokalny plik)
  → NIGDY nie trafia do git (.gitignore blokuje .env*)
  → NIGDY nie trafia do Vercel

Vercel Dashboard (Project Settings → Environment Variables)
  → Przechowywane zaszyfrowane przez Vercel
  → Dostępne dla `process.env` w Server Actions i Route Handlers
  → NIEdostępne w przeglądarce (brak NEXT_PUBLIC_ prefiksu)
  → NIEdostępne w kodzie klienckim
```

## 6. Po deployu — weryfikacja

1. Otwórz URL z Vercel (np. `https://questions-abc123.vercel.app`)
2. Utwórz sesję testową
3. Wylosuj pytanie i kliknij "Sprawdź" — Gemini powinien odpowiedzieć
4. Sprawdź statystyki

## 7. Rozwiązywanie problemów

| Problem | Przyczyna | Rozwiązanie |
|---|---|---|
| `"Missing TURSO_DATABASE_URL env"` | Zmienne nie dodane w Vercel | Dodaj w Project Settings → Environment Variables i redeploy |
| `429 Too Many Requests` | Limit Gemini | Poczekaj minutę lub sprawdź https://aistudio.google.com |
| `Błąd przy tworzeniu sesji` | Tabele nie istnieją w Turso | Uruchom `turso db shell <nazwa-bazy> < sql/migration.sql` |
| Strona nie działa po deployu | Błąd builda | Sprawdź logi w Vercel Dashboard → Deployments → x → Logs |

## 8. Opcjonalnie: domena własna

Vercel → Project → Settings → Domains → dodaj swoją domenę + ustaw DNS.

## 9. Komendy Vercel CLI (wygodniejszy deploy)

```bash
# Instalacja CLI
npm i -g vercel

# Login
vercel login

# Deploy z lokalnego kodu
vercel

# Zmienne env z CLI (zamiast panelu)
vercel env add TURSO_DATABASE_URL

# Deploy na produkcję
vercel --prod
```
