import "server-only";

import { fetchMonthlyFee, fetchYearlyFee } from "./_lib/fetcher";
import SubscriptionsMonthlyTotalFeeCardPresentation from "./subscriptions-monthly-total-fee-card.presentation";

export default async function SubscriptionsMonthlyTotalFeeCard() {
  const monthlyFee: number = await fetchMonthlyFee();
  const yearlyFee: number = await fetchYearlyFee();

  return (
    <SubscriptionsMonthlyTotalFeeCardPresentation
      fee={Math.round(monthlyFee + yearlyFee / 12)}
    />
  );
}
