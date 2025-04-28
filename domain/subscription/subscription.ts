import type { CurrencyId } from "@/domain/currency/currency-id";
import type { IntervalId } from "@/domain/interval/interval-id";

export interface ISubscription {
  readonly id: string;
  readonly name: string;
  readonly active: boolean;
  readonly amount: number;
  readonly currencyId: CurrencyId;
  readonly nextUpdate: Date;
  readonly intervalCycle: number;
  readonly intervalId: IntervalId;
  readonly cancellationMethodId: string;
}
