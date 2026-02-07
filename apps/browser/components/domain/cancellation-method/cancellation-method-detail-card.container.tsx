import "server-only";

import { fetchCancellationMethod } from "./_lib/fetcher";
import { CancellationMethodDetailCardPresentation } from "./cancellation-method-detail-card.presentation";

export async function CancellationMethodDetailCardContainer({
  cancellationMethodId,
}: {
  cancellationMethodId: string;
}) {
  const cancellationMethod = cancellationMethodId
    ? await fetchCancellationMethod(cancellationMethodId)
    : undefined;
  return (
    <>
      {cancellationMethod ? (
        <CancellationMethodDetailCardPresentation
          cancellationMethod={cancellationMethod}
        />
      ) : (
        <p className="text-center">解約方法が結びつけられていません。</p>
      )}
    </>
  );
}
