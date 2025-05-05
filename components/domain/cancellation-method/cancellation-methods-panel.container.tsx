import "server-only";

import { fetchCancellationMethods } from "./_lib/fetcher";
import CancellationMethodsPanelPresentation from "./cancellation-methods-panel.presentation";

export default async function CancellationMethodsPanel() {
  const cancellationMethods = await fetchCancellationMethods();

  return (
    <CancellationMethodsPanelPresentation
      cancellationMethods={cancellationMethods}
    />
  );
}
