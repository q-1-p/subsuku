import "server-only";

import { fetchYearlyFee } from "./_lib/fetcher";
import SubscriptionsYearlyFeeCardPresentation from "./subscriptions-yearly-fee-card.presentation";

export default async function SubscriptionsYearlyFeeCard() {
  const yearlyFee: number = await fetchYearlyFee();

  return <SubscriptionsYearlyFeeCardPresentation fee={yearlyFee} />;
}
