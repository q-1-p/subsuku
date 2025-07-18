import {
  fetchSubscription,
  fetchSubscriptionSuggestions,
} from "./_lib/fetcher";
import { SubscriptionEditFormPresentation } from "./subscription-edit-form.presentation";

export async function SubscriptionEditForm({
  subscriptionId,
}: {
  subscriptionId?: string;
}) {
  const subscription = subscriptionId
    ? await fetchSubscription(subscriptionId)
    : undefined;

  return (
    <SubscriptionEditFormPresentation
      subscription={subscription}
      subscriptionNameSuggestions={fetchSubscriptionSuggestions()}
    />
  );
}
