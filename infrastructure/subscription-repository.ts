import { addDays, addMonths, addYears, format } from "date-fns";
import { and, eq, gte, lt, sql } from "drizzle-orm";

import { db } from "@/db";
import { subscriptionsTable } from "@/db/schema";
import type { CancellationMethodId } from "@/domain/cancellation-method/cancellation-method-id";
import type { CurrencyId } from "@/domain/currency/currency-id";
import type { ISubscription } from "@/domain/subscription/subscription";
import type { SubscriptionId } from "@/domain/subscription/subscription-id";
import type { SubscriptionRegistered } from "@/domain/subscription/subscription-registered";
import type { ISubscriptionRepository } from "@/domain/subscription/subscription-repository";
import type { SubscriptionUpdated } from "@/domain/subscription/subscription-updated";
import type { UserId } from "@/domain/user/user-id";
import { type Result, err, ok } from "@/lib/result";
import { CurrencyRepository } from "./currency-repository";

const findSubscriptionQuery = db.query.subscriptionsTable
  .findFirst({
    where: (subscription) =>
      and(
        eq(subscription.userId, sql.placeholder("userId")),
        eq(subscription.id, sql.placeholder("subscriptionId")),
      ),
  })
  .prepare("find");
const searchSubscriptionsForNextUpdateQuery = db
  .select({
    amount: subscriptionsTable.amount,
    currency: subscriptionsTable.currencyId,
  })
  .from(subscriptionsTable)
  .where(
    and(
      eq(subscriptionsTable.userId, sql.placeholder("userId")),
      eq(subscriptionsTable.active, sql.placeholder("active")),
      gte(subscriptionsTable.nextUpdate, sql.placeholder("today")),
      lt(subscriptionsTable.nextUpdate, sql.placeholder("nextUpdate")),
    ),
  )
  .prepare("searchForNextUpdate");
const findAllSubscriptionsQuery = db
  .select()
  .from(subscriptionsTable)
  .where(
    and(
      eq(subscriptionsTable.userId, sql.placeholder("userId")),
      eq(subscriptionsTable.active, sql.placeholder("active")),
    ),
  )
  .prepare("findAll");

const countSubscriptionsQuery = db
  .select({ count: sql<number>`count(*)` })
  .from(subscriptionsTable)
  .where(
    and(
      eq(subscriptionsTable.userId, sql.placeholder("userId")),
      eq(subscriptionsTable.active, sql.placeholder("active")),
    ),
  )
  .prepare("count");

export class SubscriptionRepository implements ISubscriptionRepository {
  private currencyRepository = new CurrencyRepository();

  public find = async (
    userId: UserId,
    subscriptionId: SubscriptionId,
  ): Promise<Result<ISubscription, string>> => {
    const currenciesResult = await this.currencyRepository.findAll();
    if (currenciesResult.type === err) {
      return { type: err as typeof err, error: "" };
    }

    return findSubscriptionQuery
      .execute({
        userId: userId.value,
        subscriptionId: subscriptionId.value,
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
            fee:
              +data.amount *
              Number(currenciesResult.value.get(data.currencyId as CurrencyId)),
            amount: +data.amount,
            currencyId: data.currencyId,
            nextUpdate: new Date(data.nextUpdate),
            intervalId: data.intervalId,
            intervalCycle: data.intervalCycle,
            cancellationMethodId: data.cancellationMethodId,
          } as ISubscription,
        };
      })
      .catch((error) => {
        console.error(error);
        return { type: err as typeof err, error: error.message };
      });
  };

  public findAll = async (
    userId: UserId,
    active = true,
    upcoming = false,
  ): Promise<Result<ISubscription[], undefined>> => {
    const today = format(new Date(), "yyyy-MM-dd");
    const upcomingDate = format(addDays(new Date(), 7), "yyyy-MM-dd");
    const currenciesResult = await this.currencyRepository.findAll();
    if (currenciesResult.type === err) {
      return { type: err as typeof err, error: undefined };
    }

    return (
      upcoming
        ? searchSubscriptionsForNextUpdateQuery
        : findAllSubscriptionsQuery
    )
      .execute({
        userId: userId.value,
        active,
        today,
        upcomingDate,
      })
      .then((x) => {
        const subscriptions = x.map(
          (data) =>
            ({
              id: data.id,
              name: data.name,
              active: data.active,
              fee:
                +data.amount *
                Number(
                  currenciesResult.value.get(data.currencyId as CurrencyId),
                ),
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

  public count = (
    userId: UserId,
    active = true,
  ): Promise<Result<number, undefined>> => {
    return countSubscriptionsQuery
      .execute({ userId: userId.value, active })
      .then((res) => {
        return { type: ok as typeof ok, value: +res[0].count };
      })
      .catch((error) => {
        console.error(error);
        return { type: err as typeof err, error: undefined };
      });
  };
  public fetchMonthlyFee = async (
    userId: UserId,
    active = true,
  ): Promise<Result<number, undefined>> => {
    const today = format(new Date(), "yyyy-MM-dd");
    const nextMonthDate = format(addMonths(new Date(), 1), "yyyy-MM-dd");

    const currenciesResult = await new CurrencyRepository().findAll();
    if (currenciesResult.type === err) {
      return { type: err as typeof err, error: undefined };
    }

    return await searchSubscriptionsForNextUpdateQuery
      .execute({
        userId: userId.value,
        active,
        today,
        nextUpdate: nextMonthDate,
      })
      .then((datum) => {
        if (datum.length === 0) {
          return {
            type: ok as typeof ok,
            value: 0,
          };
        }

        const fee = datum
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
  public fetchYearlyFee = async (
    userId: UserId,
    active = true,
  ): Promise<Result<number, undefined>> => {
    const today = format(new Date(), "yyyy-MM-dd");
    const nextYearDate = format(addYears(new Date(), 1), "yyyy-MM-dd");

    const currenciesResult = await new CurrencyRepository().findAll();
    if (currenciesResult.type === err) {
      return { type: err as typeof err, error: undefined };
    }

    return await searchSubscriptionsForNextUpdateQuery
      .execute({
        userId: userId.value,
        active,
        today,
        nextUpdate: nextYearDate,
      })
      .then((datum) => {
        if (datum.length === 0) {
          return {
            type: ok as typeof ok,
            value: 0,
          };
        }

        const fee = datum
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

  public insert = (
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
      })
      .then(() => true)
      .catch((error) => {
        console.error(error);
        return false;
      });
  };

  public update = (
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

  public linkCancellationMethod = (
    userId: UserId,
    subscriptionId: SubscriptionId,
    cancellationMethodId: CancellationMethodId,
  ) => {
    return db
      .update(subscriptionsTable)
      .set({
        cancellationMethodId: cancellationMethodId.value,
      })
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

  public delete = (
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
