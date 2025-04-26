import { intervalId } from "./interval-id";
import type { IntervalId } from "./interval-id";

export const intervalNames: { [key in IntervalId]: string } = {
  [intervalId.monthly]: "月額",
  [intervalId.yearly]: "年額",
} as const;
