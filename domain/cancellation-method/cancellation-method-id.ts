import { type Result, ok } from "@/lib/result";

export class CancellationMethodId {
  value: string;

  private constructor(id: string) {
    this.value = id;
  }

  public static factory(id: string): Result<CancellationMethodId, string> {
    return { type: ok, value: new CancellationMethodId(id) };
  }
}
