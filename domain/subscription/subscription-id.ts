import { type Result, err, ok } from "@/lib/result";

export class SubscriptionId {
  public readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static factory(value: string): Result<SubscriptionId, string> {
    if (
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        value,
      )
    ) {
      return { type: err, error: "入力値が不正です" };
    }

    return { type: ok, value: new SubscriptionId(value) };
  }
}
