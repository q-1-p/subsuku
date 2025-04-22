import type { CurrencyId } from "@/domain/currency/currency-id";
import { type Result, ok } from "@/lib/result";

export class Fee {
  public readonly amount: number;
  public readonly currencyId: CurrencyId;

  private constructor(amount: number, currency: CurrencyId) {
    this.amount = amount;
    this.currencyId = currency;
  }

  public static factory(
    value: number,
    currencyId: CurrencyId,
  ): Result<Fee, string> {
    return { type: ok, value: new Fee(value, currencyId) };
  }
}
