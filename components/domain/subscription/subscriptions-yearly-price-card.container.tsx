import "server-only";

import { fetchYearlyPrice } from "./_functions";
import SubscriptionsYearlyPriceCardPresentation from "./subscriptions-yearly-price-card.presentation";

export default async function SubscriptionsYearlyPriceCard() {
  const yearlyPrice: number = await fetchYearlyPrice();

  return <SubscriptionsYearlyPriceCardPresentation fee={yearlyPrice / 12} />;
}
