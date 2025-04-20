import { type Result, err, ok } from "@/lib/result";

export class SubscriptionId {
  public readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static factory(value: string): Result<SubscriptionId, string> {
    if (typeof value !== "string") {
      return { type: err, error: "入力値が不正です" };
    }
    return { type: ok, value: new SubscriptionId(value) };
  }
}
