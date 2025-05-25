import { intervalId } from "./interval-id";
import type { IntervalId } from "./interval-id";

export const intervalNames: { [key in IntervalId]: string } = {
  [intervalId.monthly]: "月",
  [intervalId.yearly]: "年",
} as const;
