export const timeUnit = {
  month: 0,
  year: 1,
} as const;

export type TimeUnit = (typeof timeUnit)[keyof typeof timeUnit];
