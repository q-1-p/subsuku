export type IntervalId = (typeof intervalId)[keyof typeof intervalId];

export const intervalId = {
  monthly: 0,
  yearly: 1,
} as const;

export const intervalNames: { [key in IntervalId]: string } = {
  [intervalId.monthly]: "月額",
  [intervalId.yearly]: "年額",
} as const;
