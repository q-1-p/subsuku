import { currentUser } from "@clerk/nextjs/server";

import { countSubscriptions } from "./_functions";
import SubscriptionsCountCardPresentation from "./subscriptions-count-card.presentation";

export default async function SubscriptionsCountCard() {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return null;
  }
  const count: number = await countSubscriptions(clerkUser);

  return <SubscriptionsCountCardPresentation count={count} />;
}
