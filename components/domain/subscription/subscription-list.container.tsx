import "server-only";

import type { SubscriptionDetail } from "@/domain/type";
import { fetchSubscriptions } from "./_lib/fetcher";
import SubscriptionListPresentation from "./subscription-list.presentation";

export default async function SubscriptionList({
  upcoming,
  isOverView,
}: {
  upcoming: boolean;
  isOverView: boolean;
}) {
  const subscriptions: SubscriptionDetail[] = await fetchSubscriptions(false);

  return (
    <SubscriptionListPresentation
      subscriptions={upcoming ? subscriptions : subscriptions}
      upcoming={upcoming}
      isOverView={isOverView}
    />
  );
}
