import type { Result } from "../../lib/result";
import type { UserId } from "../user/user-id";
import type { ISubscription } from "./subscription";
import type { SubscriptionId } from "./subscription-id";
import type { SubscriptionRegistered } from "./subscription-registered";
import type { SubscriptionUpdated } from "./subscription-updated";

export interface ISubscriptionRepository {
  fetchSubscription: (
    userId: UserId,
    subscriptionId: SubscriptionId,
  ) => Promise<Result<ISubscription, string>>;

  fetchSubscriptions: (
    userId: UserId,
    active?: boolean,
    upcoming?: boolean,
  ) => Promise<Result<ISubscription[], undefined>>;

  countSubscriptions: (
    userId: UserId,
    active?: boolean,
  ) => Promise<Result<number, undefined>>;

  fetchSubscriptionsMonthlyFee: (
    userId: UserId,
    active?: boolean,
  ) => Promise<Result<number, undefined>>;

  fetchSubscriptionsYearlyFee: (
    userId: UserId,
    active?: boolean,
  ) => Promise<Result<number, undefined>>;

  registerSubscription: (
    userId: UserId,
    subscriptionRegistered: SubscriptionRegistered,
  ) => Promise<boolean>;

  updateSubscription: (
    userId: UserId,
    subscriptionRegistered: SubscriptionUpdated,
  ) => Promise<boolean>;

  deleteSubscription: (
    userId: UserId,
    subscriptionId: SubscriptionId,
  ) => Promise<boolean>;
}
