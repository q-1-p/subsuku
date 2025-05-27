import { timeUnit } from "./interval-id";
import type { TimeUnit } from "./interval-id";

export const intervalNames: { [key in TimeUnit]: string } = {
  [timeUnit.month]: "月",
  [timeUnit.year]: "年",
} as const;
