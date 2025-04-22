import type { CurrencyId } from "@/domain/currency/currency-id";
import type { IntervalUnit } from "@/domain/interval";

export interface ISubscription {
  readonly id: string;
  readonly name: string;
  readonly active: boolean;
  readonly fee: number;
  readonly currency: CurrencyId;
  readonly nextUpdate: Date;
  readonly intervalCycle: number;
  readonly intervalUnit: IntervalUnit;
}
