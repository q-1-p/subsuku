import type { CurrencyId, TimeUnit } from "@/domain/type";

export interface ISubscription {
  readonly id: string;
  readonly name: string;
  readonly active: boolean;
  readonly fee: number;
  readonly amount: number;
  readonly currencyId: CurrencyId;
  readonly nextUpdate: Date;
  readonly intervalCycle: number;
  readonly intervalId: TimeUnit;
  readonly cancellationMethodId: string;
}
