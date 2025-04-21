import type { Currency } from "@/domain/currency/currency";
import { type Result, ok } from "@/lib/result";

export class Fee {
  private constructor(
    public readonly price: number,
    public readonly currency: Currency,
  ) {
    this.price = price;
    this.currency = currency;
  }

  public static factory(
    value: number,
    currency: Currency,
  ): Result<Fee, string> {
    return { type: ok, value: new Fee(value, currency) };
  }
}
