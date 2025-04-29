import "server-only";
import { fetchSubscription } from "./fetcher";
import SubscriptionBillingInformationCardPresentation from "./subscription-billing-information-card.presentation";

export default async function SubscriptionBillingInformationCard(
  subscriptionId: string,
) {
  const subscription = await fetchSubscription(subscriptionId);
  alert(subscription);

  return (
    <SubscriptionBillingInformationCardPresentation
      subscription={subscription}
    />
  );
}
