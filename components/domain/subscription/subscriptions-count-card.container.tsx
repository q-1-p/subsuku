import { countSubscriptions } from "./_functions";
import SubscriptionsCountCardPresentation from "./subscriptions-count-card.presentation";

export default async function SubscriptionsCountCard() {
  const count: number = await countSubscriptions();

  return <SubscriptionsCountCardPresentation count={count} />;
}
