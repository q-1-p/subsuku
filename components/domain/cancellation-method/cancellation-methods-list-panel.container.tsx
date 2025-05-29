import "server-only";

import { CancellationMethodsPanelPresentation } from "./cancellation-methods-list-panel.presentation";

export async function CancellationMethodsPanel() {
  return <CancellationMethodsPanelPresentation />;
}
