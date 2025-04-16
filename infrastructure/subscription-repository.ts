import { addDays, format } from "date-fns";
import { eq, gte, lt } from "drizzle-orm";

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
}
