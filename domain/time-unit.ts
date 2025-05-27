export type TimeUnit = (typeof timeUnit)[keyof typeof timeUnit];

export const timeUnit = {
  month: 0,
  year: 1,
} as const;
