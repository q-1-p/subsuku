import type { CurrencyId } from "@/domain/currency/currency-id";
import { type Result, ok } from "@/lib/result";

export class Fee {
  private constructor(
    public readonly price: number,
    public readonly currency: CurrencyId,
  ) {
    this.price = price;
    this.currency = currency;
  }

  public static factory(
    value: number,
    currency: CurrencyId,
  ): Result<Fee, string> {
    return { type: ok, value: new Fee(value, currency) };
  }
}
