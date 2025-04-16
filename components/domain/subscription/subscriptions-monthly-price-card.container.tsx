import { currentUser } from "@clerk/nextjs/server";

import { fetchMonthlyPrice } from "./_functions";
import SubscriptionsMonthlyPriceCardPresentation from "./subscriptions-monthly-price-card.presentation";

export default async function SubscriptionsMonthlyPriceCard() {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return null;
  }
  const monthlyPrice: number = await fetchMonthlyPrice(clerkUser);

  return <SubscriptionsMonthlyPriceCardPresentation fee={monthlyPrice} />;
}
