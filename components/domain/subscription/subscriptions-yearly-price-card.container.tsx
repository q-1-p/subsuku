import { currentUser } from "@clerk/nextjs/server";

import { fetchYearlyPrice } from "./_functions";
import SubscriptionsYearlyPriceCardPresentation from "./subscriptions-yearly-price-card.presentation";

export default async function SubscriptionsYearlyPriceCard() {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return null;
  }
  const yearlyPrice: number = await fetchYearlyPrice(clerkUser);

  return <SubscriptionsYearlyPriceCardPresentation fee={yearlyPrice / 12} />;
}
