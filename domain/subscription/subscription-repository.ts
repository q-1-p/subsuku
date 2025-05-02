import type { Result } from "../../lib/result";
import type { CancellationMethodId } from "../cancellation-method/cancellation-method-id";
import type { UserId } from "../user/user-id";
import type { ISubscription } from "./subscription";
import type { SubscriptionId } from "./subscription-id";
import type { SubscriptionRegistered } from "./subscription-registered";
import type { SubscriptionUpdated } from "./subscription-updated";

export interface ISubscriptionRepository {
  find: (
    userId: UserId,
    subscriptionId: SubscriptionId,
  ) => Promise<Result<ISubscription, string>>;
  findAll: (
    userId: UserId,
    active?: boolean,
    upcoming?: boolean,
  ) => Promise<Result<ISubscription[], undefined>>;

  count: (
    userId: UserId,
    active?: boolean,
  ) => Promise<Result<number, undefined>>;
  fetchMonthlyFee: (
    userId: UserId,
    active?: boolean,
  ) => Promise<Result<number, undefined>>;
  fetchYearlyFee: (
    userId: UserId,
    active?: boolean,
  ) => Promise<Result<number, undefined>>;

  insert: (
    userId: UserId,
    subscriptionRegistered: SubscriptionRegistered,
  ) => Promise<boolean>;

  update: (
    userId: UserId,
    subscriptionRegistered: SubscriptionUpdated,
  ) => Promise<boolean>;

  linkCancellationMethod: (
    userId: UserId,
    subscriptionId: SubscriptionId,
    cancellationMethodId: CancellationMethodId,
  ) => Promise<boolean>;

  delete: (userId: UserId, subscriptionId: SubscriptionId) => Promise<boolean>;
}
