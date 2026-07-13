export function weightedPick(
  items: { id: number; weight: number }[]
): number | null {
  if (items.length === 0) return null;
  const totalWeight = items.reduce((sum, w) => sum + w.weight, 0);
  const random = Math.random() * totalWeight;
  let cumulative = 0;
  for (const item of items) {
    cumulative += item.weight;
    if (random <= cumulative) return item.id;
  }
  return items[0].id;
}

export const MIN_WEIGHT = 0.05;
export const MAX_WEIGHT = 2.0;

export function scoreToFactor(score: number): number {
  if (score >= 4) return 0.4;
  if (score === 3) return 0.7;
  return 1.2;
}

export function clampWeight(weight: number): number {
  return Math.min(MAX_WEIGHT, Math.max(MIN_WEIGHT, weight));
}

export function computeNewWeight(currentWeight: number, score: number): number {
  const factor = scoreToFactor(score);
  return clampWeight(currentWeight * factor);
}

export function computeSkipWeight(currentWeight: number): number {
  return clampWeight(currentWeight * 1.1);
}
