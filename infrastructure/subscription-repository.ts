import { addDays, addMonths, addYears, format } from "date-fns";
import { and, eq, gte, lt, sql } from "drizzle-orm";

import { db } from "@/db";
import { subscriptionsTable } from "@/db/schema";
import type { CurrencyId } from "@/domain/currency/currency-id";
import type { ISubscription } from "@/domain/subscription/subscription";
import type { SubscriptionId } from "@/domain/subscription/subscription-id";
import type { SubscriptionRegistered } from "@/domain/subscription/subscription-registered";
import type { ISubscriptionRepository } from "@/domain/subscription/subscription-repository";
import type { SubscriptionUpdated } from "@/domain/subscription/subscription-updated";
import type { UserId } from "@/domain/user/user-id";
import { type Result, err, ok } from "@/lib/result";
import { CurrencyRepository } from "./currency-repository";

export class SubscriptionRepository implements ISubscriptionRepository {
  public fetchSubscription = (
    userId: UserId,
    subscriptionId: SubscriptionId,
  ): Promise<Result<ISubscription, string>> => {
    return db.query.subscriptionsTable
      .findFirst({
        where: (subscription) =>
          and(
            eq(subscription.userId, userId.value),
            eq(subscription.id, subscriptionId.value),
          ),
      })
      .then((data) => {
        if (!data) {
          throw new Error("サブスクリプションが見つかりませんでした");
        }

        return {
          type: ok as typeof ok,
          value: {
            id: data.id,
            name: data.name,
            active: data.active,
            amount: +data.amount,
            currencyId: data.currencyId,
            nextUpdate: new Date(data.nextUpdate),
            intervalId: data.intervalId,
            intervalCycle: data.intervalCycle,
          } as ISubscription,
        };
      })
      .catch((error) => {
        console.error(error);
        return { type: err as typeof err, error: error.message };
      });
  };

  public fetchSubscriptions = (
    userId: UserId,
    active = true,
    upcoming = false,
  ): Promise<Result<ISubscription[], undefined>> => {
    const today = format(new Date(), "yyyy-MM-dd");
    const upcomingDate = format(addDays(new Date(), 7), "yyyy-MM-dd");

    return db
      .select()
      .from(subscriptionsTable)
      .where(
        upcoming
          ? eq(subscriptionsTable.active, active) &&
              eq(subscriptionsTable.userId, userId.value) &&
              gte(subscriptionsTable.nextUpdate, today) &&
              lt(subscriptionsTable.nextUpdate, upcomingDate)
          : eq(subscriptionsTable.active, active) &&
              eq(subscriptionsTable.userId, userId.value),
      )
      .then((x) => {
        const subscriptions = x.map(
          (data) =>
            ({
              id: data.id,
              name: data.name,
              active: data.active,
              amount: +data.amount,
              currencyId: data.currencyId,
              nextUpdate: new Date(data.nextUpdate),
              intervalId: data.intervalId,
              intervalCycle: data.intervalCycle,
            }) as ISubscription,
        );
        return { type: ok as typeof ok, value: subscriptions };
      })
      .catch((error) => {
        console.error(error);
        return { type: err as typeof err, error: undefined };
      });
  };

  public countSubscriptions = (
    userId: UserId,
    active = true,
  ): Promise<Result<number, undefined>> => {
    return db
      .select({ count: sql<number>`count(*)` })
      .from(subscriptionsTable)
      .where(
        eq(subscriptionsTable.userId, userId.value) &&
          eq(subscriptionsTable.active, active),
      )
      .then((res) => {
        return { type: ok as typeof ok, value: +res[0].count };
      })
      .catch((error) => {
        console.error(error);
        return { type: err as typeof err, error: undefined };
      });
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
        amount: subscriptionsTable.amount,
        currency: subscriptionsTable.currencyId,
      })
      .from(subscriptionsTable)
      .where(
        eq(subscriptionsTable.userId, userId.value) &&
          eq(subscriptionsTable.active, active) &&
          gte(subscriptionsTable.nextUpdate, today) &&
          lt(subscriptionsTable.nextUpdate, nextMonthDate),
      )
      .then((x) => {
        const fee = x
          .map(
            (x) =>
              +x.amount *
              Number(currenciesResult.value.get(x.currency as CurrencyId)),
          )
          .reduce((a, b) => a + b);
        return {
          type: ok as typeof ok,
          value: fee,
        };
      })
      .catch((error) => {
        console.error(error);
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
        amount: subscriptionsTable.amount,
        currency: subscriptionsTable.currencyId,
      })
      .from(subscriptionsTable)
      .where(
        eq(subscriptionsTable.userId, userId.value) &&
          eq(subscriptionsTable.active, active) &&
          gte(subscriptionsTable.nextUpdate, today) &&
          lt(subscriptionsTable.nextUpdate, nextYearDate),
      )
      .then((x) => {
        const fee = x
          .map(
            (x) =>
              +x.amount *
              Number(currenciesResult.value.get(x.currency as CurrencyId)),
          )
          .reduce((a, b) => a + b);

        return { type: ok as typeof ok, value: fee };
      })
      .catch((error) => {
        console.error(error);
        return { type: err as typeof err, error: undefined };
      });
  };

  public registerSubscription = (
    userId: UserId,
    subscriptionRegistered: SubscriptionRegistered,
  ) => {
    return db
      .insert(subscriptionsTable)
      .values({
        name: subscriptionRegistered.name.value,
        userId: userId.value,
        amount: subscriptionRegistered.fee.amount.toString(),
        currencyId: subscriptionRegistered.fee.currencyId,
        nextUpdate: format(subscriptionRegistered.nextUpdate, "yyyy-MM-dd"),
        intervalCycle: subscriptionRegistered.interval.cycle,
        intervalId: subscriptionRegistered.interval.id,
        cancellationMethodId: "",
      })
      .then(() => true)
      .catch((error) => {
        console.error(error);
        return false;
      });
  };

  public updateSubscription = (
    userId: UserId,
    subscriptionUpdated: SubscriptionUpdated,
  ) => {
    return db
      .update(subscriptionsTable)
      .set({
        name: subscriptionUpdated.name.value,
        userId: userId.value,
        amount: subscriptionUpdated.fee.amount.toString(),
        currencyId: subscriptionUpdated.fee.currencyId,
        nextUpdate: format(subscriptionUpdated.nextUpdate, "yyyy-MM-dd"),
        intervalCycle: subscriptionUpdated.interval.cycle,
        intervalId: subscriptionUpdated.interval.id,
      })
      .where(
        and(
          eq(subscriptionsTable.userId, userId.value),
          eq(subscriptionsTable.id, subscriptionUpdated.id.value),
        ),
      )
      .then(() => true)
      .catch((error) => {
        console.error(error);
        return false;
      });
  };

  public deleteSubscription = (
    userId: UserId,
    subscriptionId: SubscriptionId,
  ): Promise<boolean> => {
    return db
      .delete(subscriptionsTable)
      .where(
        and(
          eq(subscriptionsTable.userId, userId.value),
          eq(subscriptionsTable.id, subscriptionId.value),
        ),
      )
      .then(() => true)
      .catch((error) => {
        console.error(error);
        return false;
      });
  };
}
