import "server-only";

import { fetchMonthlyFee } from "./_functions";
import SubscriptionsMonthlyFeeCardPresentation from "./subscriptions-monthly-fee-card.presentation";

export default async function SubscriptionsMonthlyFeeCard() {
  const monthlyFee: number = await fetchMonthlyFee();

  return <SubscriptionsMonthlyFeeCardPresentation fee={monthlyFee} />;
}
