import type { CancellationMethodId, SubscriptionId, UserId } from "../type";

export interface ISubscriptionRepository {
  linkCancellationMethod: (
    userId: UserId,
    subscriptionId: SubscriptionId,
    cancellationMethodId: CancellationMethodId,
  ) => Promise<boolean>;
}
