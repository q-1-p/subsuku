import type { Result } from "../../lib/result";
import type { UserId } from "../user/user-id";
import type { ISubscription } from "./subscription";
import type { SubscriptionRegistered } from "./subscription-registered";

export interface ISubscriptionRepository {
  fetchSubscriptions: (
    userId: UserId,
    active?: boolean,
    upcoming?: boolean,
  ) => Promise<Result<ISubscription[], string>>;

  countSubscriptions: (
    userId: UserId,
    active?: boolean,
  ) => Promise<Result<number, string>>;

  fetchSubscriptionsMonthlyPrice: (
    userId: UserId,
    active?: boolean,
  ) => Promise<Result<number, string>>;

  fetchSubscriptionsYearlyPrice: (
    userId: UserId,
    active?: boolean,
  ) => Promise<Result<number, string>>;

  registerSubscription: (
    userId: UserId,
    subscriptionRegistered: SubscriptionRegistered,
  ) => Promise<boolean>;
}
