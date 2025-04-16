import "server-only";

import { fetchMonthlyPrice, fetchYearlyPrice } from "./_functions";
import SubscriptionsMonthlyTotalPriceCardPresentation from "./subscriptions-monthly-total-price-card.presentation";

export default async function SubscriptionsMonthlyTotalPriceCard() {
  const monthlyPrice: number = await fetchMonthlyPrice();
  const yearlyPrice: number = await fetchYearlyPrice();

  return (
    <SubscriptionsMonthlyTotalPriceCardPresentation
      fee={Math.round(monthlyPrice + yearlyPrice / 12)}
    />
  );
}
