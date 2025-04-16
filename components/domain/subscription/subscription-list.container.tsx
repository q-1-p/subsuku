import "server-only";

import type { ISubscription } from "@/domain/subscription/subscription";
import { fetchSubscriptions } from "./_functions";
import SubscriptionListPresentation from "./subscription-list.presentation";

export default async function SubscriptionList({
  upcoming,
  isOverView,
}: {
  upcoming: boolean;
  isOverView: boolean;
}) {
  const subscriptions: ISubscription[] = await fetchSubscriptions(upcoming);

  return (
    <SubscriptionListPresentation
      subscriptions={upcoming ? subscriptions : subscriptions}
      isOverView={isOverView}
    />
  );
}
