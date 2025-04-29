import CancellationMethodInformationCardPresentation from "./cancellation-method-information-card.presentation";
import { fetchCancellationMethod } from "./fetcher";

export default async function CancellationMethodInformationCardContainer({
  cancellationMethodId,
}: {
  cancellationMethodId: string;
}) {
  const cancellationMethod =
    await fetchCancellationMethod(cancellationMethodId);
  console.dir(cancellationMethod);
  return (
    <>
      {cancellationMethod ? (
        <CancellationMethodInformationCardPresentation
          cancellationMethod={cancellationMethod}
        />
      ) : (
        <p className="text-center">解約方法が結びつけられていません。</p>
      )}
    </>
  );
}
