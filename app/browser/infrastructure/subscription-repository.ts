import { addMonths, addYears, format } from "date-fns";
import { and, eq, lt } from "drizzle-orm";

import { db } from "@/db";
import { subscriptionsTable } from "@/db/schema";
import {
  type CancellationMethodId,
  type Subscription,
  type SubscriptionId,
  timeUnit,
  type UserId,
} from "@/domain/type";

import type { ISubscriptionRepository } from "@/domain/subscription/subscription-repository";

export class SubscriptionRepository implements ISubscriptionRepository {
  public insert = (userId: UserId, subscription: Subscription) => {
    return db
      .insert(subscriptionsTable)
      .values({
        name: subscription.name,
        userId: userId,
        amount: subscription.amount.toString(),
        currencyId: subscription.currencyId,
        nextUpdate: format(subscription.nextUpdate, "yyyy-MM-dd"),
        updateCycleNumber: subscription.updateCycle.number,
        updateCycleUnit: subscription.updateCycle.unit,
      })
      .then(() => true)
      .catch((error) => {
        console.error(error);
        return false;
      });
  };

  public updateNextUpdate = async () => {
    const today = format(new Date(), "yyyy-MM-dd");
    const updateSubscriptions = await db
      .select({
        id: subscriptionsTable.id,
        nextUpdate: subscriptionsTable.nextUpdate,
        updateCycleNumber: subscriptionsTable.updateCycleNumber,
        updateCycleUnit: subscriptionsTable.updateCycleUnit,
      })
      .from(subscriptionsTable)
      .where(lt(subscriptionsTable.nextUpdate, today));

    for (const subscription of updateSubscriptions) {
      const nextUpdate =
        subscription.updateCycleUnit === timeUnit.month
          ? addMonths(subscription.nextUpdate, subscription.updateCycleNumber)
          : addYears(subscription.nextUpdate, subscription.updateCycleNumber);

      await db
        .update(subscriptionsTable)
        .set({
          nextUpdate: format(nextUpdate, "yyyy-MM-dd"),
        })
        .where(eq(subscriptionsTable.id, subscription.id));
    }
  };
  public update = (userId: UserId, subscription: Subscription) => {
    return db
      .update(subscriptionsTable)
      .set({
        name: subscription.name,
        userId: userId,
        amount: subscription.amount.toString(),
        currencyId: subscription.currencyId,
        nextUpdate: format(subscription.nextUpdate, "yyyy-MM-dd"),
        updateCycleNumber: subscription.updateCycle.number,
        updateCycleUnit: subscription.updateCycle.unit,
      })
      .where(
        and(
          eq(subscriptionsTable.userId, userId),
          eq(subscriptionsTable.id, subscription.id),
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
        linkedCancellationMethodId: cancellationMethodId,
      })
      .where(
        and(
          eq(subscriptionsTable.userId, userId),
          eq(subscriptionsTable.id, subscriptionId),
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
          eq(subscriptionsTable.userId, userId),
          eq(subscriptionsTable.id, subscriptionId),
        ),
      )
      .then(() => true)
      .catch((error) => {
        console.error(error);
        return false;
      });
  };
}
