import {} from "@/lib/result";

export const currency = {
  jpy: 0,
  usd: 1,
  eur: 2,
} as const;
export type Currency = (typeof currency)[keyof typeof currency];
