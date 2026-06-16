# Format danych pytań

Plik: `src/data/questions.ts`

## Typ

```typescript
export interface Question {
  id: number;
  question: string;
  answer: string;
}
```

## Wymagania

- `id`: unikalny numer pytania (1–67)
- `question`: treść pytania w języku polskim
- `answer`: pełna, wzorcowa odpowiedź w języku polskim

## Przykład

```typescript
{
  id: 1,
  question: "Omów architekturę systemu zarządzania bazą danych.",
  answer: "SZBD składa się z następujących komponentów: procesor zapytań (parser, optymalizator, executor), menedżer pamięci (buforowanie stron), menedżer transakcji (obsługa ACID), menedżer odzyskiwania (logi WAL, checkpointy) oraz menedżer dostępu do danych (struktury indeksowe B+ tree, bitmapy)."
}
```

## Instrukcja

1. Dodaj wszystkie pytania do tablicy `questions` w pliku `src/data/questions.ts`
2. Każde `id` musi być unikalne
3. Odpowiedzi powinny być wyczerpujące (kilka zdań każda)
4. Nie używaj znaczników HTML ani Markdown w treści
5. Po dodaniu pytań uruchom `bun run build` aby sprawdzić czy wszystko kompiluje się poprawnie
