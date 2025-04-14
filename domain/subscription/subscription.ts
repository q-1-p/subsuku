import type { Currency } from "@/domain/currency";
import type { Fee } from "@/domain/fee";
import type { IntervalUnit } from "@/domain/interval";
import { type Result, ok } from "@/lib/result";

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

export class Subscription {
  private constructor(
    public readonly id: SubscriptionId,
    public readonly name: SubscriptionName,
    public readonly active: boolean,
    public readonly fee: Fee,
    public readonly nextUpdate: Date,
    public readonly interval: IntervalUnit,
  ) {
    this.id = id;
    this.name = name;
    this.active = active;
    this.fee = fee;
    this.nextUpdate = nextUpdate;
    this.interval = interval;
  }

  public static factory(
    id: SubscriptionId,
    name: SubscriptionName,
    active: boolean,
    fee: Fee,
    nextUpdate: Date,
    interval: IntervalUnit,
  ): Result<Subscription, string> {
    return {
      type: ok,
      value: new Subscription(id, name, active, fee, nextUpdate, interval),
    };
  }
}

export class SubscriptionId {
  constructor(public readonly value: string) {
    this.value = value;
  }
}
export class SubscriptionName {
  constructor(public readonly value: string) {
    this.value = value;
  }
}
