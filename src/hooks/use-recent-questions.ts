"use client";

import { useState, useCallback } from "react";

const MAX_RECENT = 5;

export function useRecentQuestions() {
  const [recentIds, setRecentIds] = useState<number[]>([]);

  const addRecent = useCallback((id: number) => {
    setRecentIds((prev) => {
      const next = [...prev, id];
      return next.length > MAX_RECENT ? next.slice(-MAX_RECENT) : next;
    });
  }, []);

  const clearRecent = useCallback(() => {
    setRecentIds([]);
  }, []);

  return { recentIds, addRecent, clearRecent };
}
