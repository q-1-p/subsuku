import { fetchMonthlyPrice } from "./_functions";
import SubscriptionsMonthlyPriceCardPresentation from "./subscriptions-monthly-price-card.presentation";

export default async function SubscriptionsMonthlyPriceCard() {
  const monthlyPrice: number = await fetchMonthlyPrice();

  return <SubscriptionsMonthlyPriceCardPresentation fee={monthlyPrice} />;
}
