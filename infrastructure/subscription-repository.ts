import { addDays, addMonths, addYears, format } from "date-fns";
import { eq, gte, lt, sql } from "drizzle-orm";

import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import type { ISubscription } from "@/domain/subscription/subscription";
import type { ISubscriptionRepository } from "@/domain/subscription/subscription-repository";
import type { UserId } from "@/domain/user/user-id";
import { type Result, err, ok } from "@/lib/result";

export class SubscriptionRepository implements ISubscriptionRepository {
  public fetchSubscriptions = async (
    userId: UserId,
    active = true,
    upcoming = false,
  ): Promise<Result<ISubscription[], string>> => {
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
      .catch((error) => {
        return { type: err as typeof err, error: error as string };
      });

    return subscriptionsResult;
  };

  public countSubscriptions = async (
    userId: UserId,
    active = true,
  ): Promise<Result<number, string>> => {
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
      .catch((error) => {
        return { type: err as typeof err, error: error as string };
      });

    return result;
  };

  public fetchSubscriptionsMonthlyPrice = async (
    userId: UserId,
    active = true,
  ): Promise<Result<number, string>> => {
    const today = format(new Date(), "yyyy-MM-dd");
    const nextMonthDate = format(addMonths(new Date(), 1), "yyyy-MM-dd");

    return await db
      .select({ price: subscriptions.price })
      .from(subscriptions)
      .where(
        eq(subscriptions.userId, userId.value) &&
          eq(subscriptions.active, active) &&
          gte(subscriptions.nextUpdate, today) &&
          lt(subscriptions.nextUpdate, nextMonthDate),
      )
      .then((x) => {
        const prices = x.map((x) => Number(x.price));
        return { type: ok as typeof ok, value: prices.reduce((a, b) => a + b) };
      })
      .catch((error) => {
        return { type: err as typeof err, error: error as string };
      });
  };

  public fetchSubscriptionsYearlyPrice = async (
    userId: UserId,
    active = true,
  ): Promise<Result<number, string>> => {
    const today = format(new Date(), "yyyy-MM-dd");
    const nextYearDate = format(addYears(new Date(), 1), "yyyy-MM-dd");

    return await db
      .select({ price: subscriptions.price })
      .from(subscriptions)
      .where(
        eq(subscriptions.userId, userId.value) &&
          eq(subscriptions.active, active) &&
          gte(subscriptions.nextUpdate, today) &&
          lt(subscriptions.nextUpdate, nextYearDate),
      )
      .then((x) => {
        const prices = x.map((x) => Number(x.price));
        return { type: ok as typeof ok, value: prices.reduce((a, b) => a + b) };
      })
      .catch((error) => {
        return { type: err as typeof err, error: error as string };
      });
  };
}
