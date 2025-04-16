import { type Result, err, ok } from "@/lib/result";

export class UserId {
  public readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static factory(value: string): Result<UserId, string> {
    if (
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        value,
      )
    ) {
      return { type: err, error: "Invalid user id" };
    }

    return { type: ok, value: new UserId(value) };
  }
}
