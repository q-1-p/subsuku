export type IntervalId = (typeof intervalId)[keyof typeof intervalId];

export const intervalId = {
  monthly: 0,
  yearly: 1,
} as const;
