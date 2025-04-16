import { type Result, err, ok } from "@/lib/result";

export class ClerkUserId {
  public readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static factory(value: string): Result<ClerkUserId, string> {
    if (!value || 32 < value.length) {
      return { type: err, error: "Invalid clerk id" };
    }

    return { type: ok, value: new ClerkUserId(value) };
  }
}
