import { type Result, err, ok } from "@/lib/result";
import type { TimeUnit } from "./interval-id";

export class Interval {
  public readonly id: TimeUnit;
  public readonly cycle: number;

  private constructor(id: TimeUnit, cycle: number) {
    this.id = id;
    this.cycle = cycle;
  }

  public static factory(id: TimeUnit, cycle: number): Result<Interval, string> {
    if (cycle < 1) {
      return { type: err, error: "Invalid cycle" };
    }
    return { type: ok, value: new Interval(id, cycle) };
  }
}
