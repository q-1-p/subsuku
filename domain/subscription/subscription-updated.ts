import type { CurrencyId } from "@/domain/currency/currency-id";
import { Fee } from "@/domain/fee";
import { Interval } from "@/domain/interval/interval";
import type { IntervalId } from "@/domain/interval/interval-id";
import { type Result, err, ok } from "@/lib/result";
import { SubscriptionId } from "./subscription-id";
import { SubscriptionName } from "./subscription-name";

export class SubscriptionUpdated {
  public readonly id: SubscriptionId;
  public readonly name: SubscriptionName;
  public readonly fee: Fee;
  public readonly nextUpdate: Date;
  public readonly interval: Interval;
  public readonly cancellationMethod: string;

  private constructor(
    id: SubscriptionId,
    name: SubscriptionName,
    fee: Fee,
    nextUpdate: Date,
    interval: Interval,
    cancellationMethod: string,
  ) {
    this.id = id;
    this.name = name;
    this.fee = fee;
    this.nextUpdate = nextUpdate;
    this.interval = interval;
    this.cancellationMethod = cancellationMethod;
  }

  public static factory(
    id: string,
    name: string,
    amount: number,
    currencyId: CurrencyId,
    nextUpdate: Date,
    intervalId: IntervalId,
    intervalCycle: number,
    cancellationMethod: string,
  ): Result<SubscriptionUpdated, unknown> {
    const idResult = SubscriptionId.factory(id);
    const nameResult = SubscriptionName.factory(name);
    const feeResult = Fee.factory(amount, currencyId);
    const intervalResult = Interval.factory(intervalId, intervalCycle);
    if (
      idResult.type === err ||
      nameResult.type === err ||
      feeResult.type === err ||
      intervalResult.type === err
    ) {
      return { type: err, error: "登録しようとした値が不正です" };
    }

    return {
      type: ok,
      value: new SubscriptionUpdated(
        idResult.value,
        nameResult.value,
        feeResult.value,
        nextUpdate,
        intervalResult.value,
        cancellationMethod ?? "",
      ),
    };
  }
}
