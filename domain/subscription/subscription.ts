import type { Currency } from "@/domain/currency/currency";
import type { IntervalUnit } from "@/domain/interval";

export interface ISubscription {
  readonly id: string;
  readonly name: string;
  readonly active: boolean;
  readonly fee: number;
  readonly currency: Currency;
  readonly nextUpdate: Date;
  readonly intervalCycle: number;
  readonly intervalUnit: IntervalUnit;
}
