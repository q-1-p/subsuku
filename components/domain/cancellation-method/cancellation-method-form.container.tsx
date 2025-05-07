import { fetchSubscriptions } from "../subscription/_lib/fetcher";
import { fetchCancellationMethod } from "./_lib/fetcher";
import { CancellationMethodFormPresentation } from "./cancellation-method-form.presentation";

export async function CancellationMethodForm({
  cancellationMethodId,
}: { cancellationMethodId?: string }) {
  const cancellationMethod = cancellationMethodId
    ? await fetchCancellationMethod(cancellationMethodId)
    : undefined;
  const subscriptions = await fetchSubscriptions();

  return (
    <CancellationMethodFormPresentation
      cancellationMethod={cancellationMethod}
      subscriptions={subscriptions}
    />
  );
}
