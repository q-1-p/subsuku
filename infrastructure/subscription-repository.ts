import { addDays, addMonths, addYears, format } from "date-fns";
import { and, eq, gte, lt, sql } from "drizzle-orm";

import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import type { CurrencyId } from "@/domain/currency/currency-id";
import type { ISubscription } from "@/domain/subscription/subscription";
import type { SubscriptionId } from "@/domain/subscription/subscription-id";
import type { SubscriptionRegistered } from "@/domain/subscription/subscription-registered";
import type { ISubscriptionRepository } from "@/domain/subscription/subscription-repository";
import type { UserId } from "@/domain/user/user-id";
import { type Result, err, ok } from "@/lib/result";
import { CurrencyRepository } from "./currency-repository";

export class SubscriptionRepository implements ISubscriptionRepository {
  public fetchSubscriptions = async (
    userId: UserId,
    active = true,
    upcoming = false,
  ): Promise<Result<ISubscription[], undefined>> => {
    const today = format(new Date(), "yyyy-MM-dd");
    const upcomingDate = format(addDays(new Date(), 7), "yyyy-MM-dd");

    const subscriptionsResult = await db
      .select()
      .from(subscriptions)
      .where(
        upcoming
          ? eq(subscriptions.active, active) &&
              eq(subscriptions.userId, userId.value) &&
              gte(subscriptions.nextUpdate, today) &&
              lt(subscriptions.nextUpdate, upcomingDate)
          : eq(subscriptions.active, active) &&
              eq(subscriptions.userId, userId.value),
      )
      .then((x) => {
        const subscriptions = x.map(
          (x) =>
            ({
              id: x.id,
              name: x.name,
              active: x.active,
              fee: Number(x.price),
              currency: x.currencyId,
              nextUpdate: new Date(x.nextUpdate),
              intervalCycle: x.intervalCycle,
              intervalUnit: x.intervalUnitId,
            }) as ISubscription,
        );
        return { type: ok as typeof ok, value: subscriptions };
      })
      .catch(() => {
        return { type: err as typeof err, error: undefined };
      });

    return subscriptionsResult;
  };

  public countSubscriptions = async (
    userId: UserId,
    active = true,
  ): Promise<Result<number, undefined>> => {
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(subscriptions)
      .where(
        eq(subscriptions.userId, userId.value) &&
          eq(subscriptions.active, active),
      )
      .then((res) => {
        return { type: ok as typeof ok, value: Number(res[0].count) };
      })
      .catch(() => {
        return { type: err as typeof err, error: undefined };
      });

    return result;
  };

  public fetchSubscriptionsMonthlyFee = async (
    userId: UserId,
    active = true,
  ): Promise<Result<number, undefined>> => {
    const today = format(new Date(), "yyyy-MM-dd");
    const nextMonthDate = format(addMonths(new Date(), 1), "yyyy-MM-dd");

    const currenciesResult = await new CurrencyRepository().fetchCurrencies();
    if (currenciesResult.type === err) {
      return { type: err as typeof err, error: undefined };
    }

    return await db
      .select({
        price: subscriptions.price,
        currency: subscriptions.currencyId,
      })
      .from(subscriptions)
      .where(
        eq(subscriptions.userId, userId.value) &&
          eq(subscriptions.active, active) &&
          gte(subscriptions.nextUpdate, today) &&
          lt(subscriptions.nextUpdate, nextMonthDate),
      )
      .then((x) => {
        const fee = x
          .map(
            (x) =>
              +x.price *
              Number(currenciesResult.value.get(x.currency as CurrencyId)),
          )
          .reduce((a, b) => a + b);

        console.log(fee);
        return {
          type: ok as typeof ok,
          value: fee,
        };
      })
      .catch(() => {
        return { type: err as typeof err, error: undefined };
      });
  };

  public fetchSubscriptionsYearlyFee = async (
    userId: UserId,
    active = true,
  ): Promise<Result<number, undefined>> => {
    const today = format(new Date(), "yyyy-MM-dd");
    const nextYearDate = format(addYears(new Date(), 1), "yyyy-MM-dd");

    const currenciesResult = await new CurrencyRepository().fetchCurrencies();
    if (currenciesResult.type === err) {
      return { type: err as typeof err, error: undefined };
    }

    return await db
      .select({
        price: subscriptions.price,
        currency: subscriptions.currencyId,
      })
      .from(subscriptions)
      .where(
        eq(subscriptions.userId, userId.value) &&
          eq(subscriptions.active, active) &&
          gte(subscriptions.nextUpdate, today) &&
          lt(subscriptions.nextUpdate, nextYearDate),
      )
      .then((x) => {
        const fee = x
          .map(
            (x) =>
              +x.price *
              Number(currenciesResult.value.get(x.currency as CurrencyId)),
          )
          .reduce((a, b) => a + b);

        return { type: ok as typeof ok, value: fee };
      })
      .catch(() => {
        return { type: err as typeof err, error: undefined };
      });
  };

  public registerSubscription = async (
    userId: UserId,
    subscriptionRegistered: SubscriptionRegistered,
  ) =>
    db
      .insert(subscriptions)
      .values({
        name: subscriptionRegistered.name.value,
        userId: userId.value,
        price: subscriptionRegistered.fee.price.toString(),
        currencyId: subscriptionRegistered.fee.currency,
        nextUpdate: format(subscriptionRegistered.nextUpdate, "yyyy-MM-dd"),
        intervalCycle: subscriptionRegistered.interval.cycle,
        intervalUnitId: subscriptionRegistered.interval.unit,
      })
      .then(() => true)
      .catch(() => false);

  public deleteSubscription = async (
    userId: UserId,
    subscriptionId: SubscriptionId,
  ): Promise<boolean> =>
    db
      .delete(subscriptions)
      .where(
        and(
          eq(subscriptions.userId, userId.value),
          eq(subscriptions.id, subscriptionId.value),
        ),
      )
      .then(() => true)
      .catch(() => false);
}
