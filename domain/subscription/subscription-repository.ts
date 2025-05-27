import type { Result } from "../../lib/result";
import type {
  CancellationMethodId,
  Subscription,
  SubscriptionDetail,
  SubscriptionId,
  UserId,
} from "../type";

export interface ISubscriptionRepository {
  find: (
    userId: UserId,
    subscriptionId: SubscriptionId,
  ) => Promise<Result<SubscriptionDetail, string>>;
  findAll: (
    userId: UserId,
    active?: boolean,
    upcoming?: boolean,
  ) => Promise<Result<SubscriptionDetail[], undefined>>;

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
    subscriptionRegistered: Subscription,
  ) => Promise<boolean>;

  update: (
    userId: UserId,
    subscriptionUpdated: Subscription,
  ) => Promise<boolean>;

  linkCancellationMethod: (
    userId: UserId,
    subscriptionId: SubscriptionId,
    cancellationMethodId: CancellationMethodId,
  ) => Promise<boolean>;

  delete: (userId: UserId, subscriptionId: SubscriptionId) => Promise<boolean>;
}
