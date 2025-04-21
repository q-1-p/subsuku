import type { Currency } from "@/domain/currency/currency";
import { Fee } from "@/domain/fee";
import { Interval, type IntervalUnit } from "@/domain/interval";
import { type Result, err, ok } from "@/lib/result";
import { SubscriptionName } from "./subscription-name";

export class SubscriptionRegistered {
  public readonly name: SubscriptionName;
  public readonly fee: Fee;
  public readonly nextUpdate: Date;
  public readonly interval: Interval;

  private constructor(
    name: SubscriptionName,
    fee: Fee,
    nextUpdate: Date,
    interval: Interval,
  ) {
    this.name = name;
    this.fee = fee;
    this.nextUpdate = nextUpdate;
    this.interval = interval;
  }

  public static factory(
    name: string,
    price: number,
    currency: Currency,
    nextUpdate: Date,
    intervalCycle: number,
    intervalUnit: IntervalUnit,
  ): Result<SubscriptionRegistered, unknown> {
    const nameResult = SubscriptionName.factory(name);
    const feeResult = Fee.factory(price, currency);
    const intervalResult = Interval.factory(intervalCycle, intervalUnit);
    if (
      nameResult.type === err ||
      feeResult.type === err ||
      intervalResult.type === err
    ) {
      return { type: err, error: "登録しようとした値が不正です" };
    }

    return {
      type: ok,
      value: new SubscriptionRegistered(
        nameResult.value,
        feeResult.value,
        nextUpdate,
        intervalResult.value,
      ),
    };
  }
}
