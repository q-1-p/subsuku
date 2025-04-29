import type { Result } from "@/lib/result";
import type { ICancellationMethod } from "./cancellation-method";
import type { CancellationMethodId } from "./cancellation-method-id";

export type ICancellationMethodRepository = {
  find: (
    cancellationMethodId: CancellationMethodId,
  ) => Promise<Result<ICancellationMethod, undefined>>;
};
