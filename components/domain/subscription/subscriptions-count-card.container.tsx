import "server-only";

import { countSubscriptions } from "./_lib/fetcher";
import SubscriptionsCountCardPresentation from "./subscriptions-count-card.presentation";

export default async function SubscriptionsCountCard() {
  const count: number = await countSubscriptions();

  return <SubscriptionsCountCardPresentation count={count} />;
}
