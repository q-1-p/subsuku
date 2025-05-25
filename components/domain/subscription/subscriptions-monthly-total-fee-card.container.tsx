import "server-only";

import { fetchSubscriptions } from "./_lib/fetcher";
import SubscriptionsMonthlyTotalFeeCardPresentation from "./subscriptions-monthly-total-fee-card.presentation";

export default async function SubscriptionsMonthlyTotalFeeCard() {
  const subscriptions = await fetchSubscriptions();

  return (
    <SubscriptionsMonthlyTotalFeeCardPresentation
      fee={Math.round(subscriptions.reduce((a, b) => a + b.fee, 0))}
    />
  );
}
