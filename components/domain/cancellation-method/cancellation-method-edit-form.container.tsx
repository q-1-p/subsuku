import "server-only";

import {
  fetchSubscriptionSuggestions,
  fetchSubscriptions,
} from "../subscription/_lib/fetcher";
import { fetchCancellationMethod } from "./_lib/fetcher";
import { CancellationMethodEditFormPresentation } from "./cancellation-method-edit-form.presentation";

export async function CancellationMethodEditForm({
  cancellationMethodId,
}: { cancellationMethodId?: string }) {
  const cancellationMethod = cancellationMethodId
    ? await fetchCancellationMethod(cancellationMethodId)
    : undefined;
  const subscriptions = await fetchSubscriptions();

  return (
    <CancellationMethodEditFormPresentation
      cancellationMethod={cancellationMethod}
      subscriptions={subscriptions}
      subscriptionNameSuggestions={fetchSubscriptionSuggestions()}
    />
  );
}
