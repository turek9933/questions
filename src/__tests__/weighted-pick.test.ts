import { describe, it, expect } from "bun:test";
import {
  weightedPick,
  scoreToFactor,
  clampWeight,
  computeNewWeight,
  computeSkipWeight,
  MIN_WEIGHT,
  MAX_WEIGHT,
} from "@/lib/weighted-pick";

describe("weightedPick", () => {
  it("returns null for empty list", () => {
    expect(weightedPick([])).toBeNull();
  });

  it("returns the only item when list has one element", () => {
    expect(weightedPick([{ id: 5, weight: 1.0 }])).toBe(5);
  });

  it("returns id from the list", () => {
    const result = weightedPick([
      { id: 1, weight: 1 },
      { id: 2, weight: 1 },
    ]);
    expect([1, 2]).toContain(result);
  });

  it("picks higher-weight items more often", () => {
    const counts: Record<number, number> = { 1: 0, 2: 0 };
    const trials = 10000;
    for (let i = 0; i < trials; i++) {
      const pick = weightedPick([
        { id: 1, weight: 9 },
        { id: 2, weight: 1 },
      ]);
      if (pick !== null) counts[pick]++;
    }
    expect(counts[1]).toBeGreaterThan(counts[2] * 2);
  });
});

describe("scoreToFactor", () => {
  it("returns 0.4 for score >= 4", () => {
    expect(scoreToFactor(4)).toBe(0.4);
    expect(scoreToFactor(5)).toBe(0.4);
  });

  it("returns 0.7 for score === 3", () => {
    expect(scoreToFactor(3)).toBe(0.7);
  });

  it("returns 1.2 for score < 3", () => {
    expect(scoreToFactor(1)).toBe(1.2);
    expect(scoreToFactor(2)).toBe(1.2);
  });
});

describe("clampWeight", () => {
  it("does not change weight within bounds", () => {
    expect(clampWeight(1.0)).toBe(1.0);
    expect(clampWeight(0.5)).toBe(0.5);
  });

  it("clamps to MIN_WEIGHT", () => {
    expect(clampWeight(0.01)).toBe(MIN_WEIGHT);
    expect(clampWeight(0)).toBe(MIN_WEIGHT);
  });

  it("clamps to MAX_WEIGHT", () => {
    expect(clampWeight(3.0)).toBe(MAX_WEIGHT);
    expect(clampWeight(10)).toBe(MAX_WEIGHT);
  });
});

describe("computeNewWeight", () => {
  it("reduces weight for good scores", () => {
    const result = computeNewWeight(1.0, 5);
    expect(result).toBeLessThan(1.0);
    expect(result).toBeGreaterThanOrEqual(MIN_WEIGHT);
  });

  it("increases weight for poor scores", () => {
    const result = computeNewWeight(1.0, 1);
    expect(result).toBeGreaterThan(1.0);
    expect(result).toBeLessThanOrEqual(MAX_WEIGHT);
  });

  it("never goes below MIN_WEIGHT", () => {
    const result = computeNewWeight(MIN_WEIGHT, 5);
    expect(result).toBe(MIN_WEIGHT);
  });

  it("never goes above MAX_WEIGHT", () => {
    const result = computeNewWeight(MAX_WEIGHT, 1);
    expect(result).toBe(MAX_WEIGHT);
  });
});

describe("computeSkipWeight", () => {
  it("increases weight", () => {
    const result = computeSkipWeight(1.0);
    expect(result).toBe(1.1);
  });

  it("clamps to MAX_WEIGHT", () => {
    const result = computeSkipWeight(MAX_WEIGHT);
    expect(result).toBe(MAX_WEIGHT);
  });
});
