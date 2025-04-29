import "server-only";

import { fetchMonthlyFee } from "./fetcher";
import SubscriptionsMonthlyFeeCardPresentation from "./subscriptions-monthly-fee-card.presentation";

export default async function SubscriptionsMonthlyFeeCard() {
  const monthlyFee: number = await fetchMonthlyFee();

  return <SubscriptionsMonthlyFeeCardPresentation fee={monthlyFee} />;
}
