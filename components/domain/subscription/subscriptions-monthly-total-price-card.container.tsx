import { currentUser } from "@clerk/nextjs/server";

import { fetchMonthlyPrice, fetchYearlyPrice } from "./_functions";
import SubscriptionsMonthlyTotalPriceCardPresentation from "./subscriptions-monthly-total-price-card.presentation";

export default async function SubscriptionsMonthlyTotalPriceCard() {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return null;
  }
  const monthlyPrice: number = await fetchMonthlyPrice(clerkUser);
  const yearlyPrice: number = await fetchYearlyPrice(clerkUser);

  return (
    <SubscriptionsMonthlyTotalPriceCardPresentation
      fee={Math.round(monthlyPrice + yearlyPrice / 12)}
    />
  );
}
