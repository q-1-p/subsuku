import type { Result } from "@/lib/result";
import type { UserId } from "../user/user-id";
import type { ICancellationMethod } from "./cancellation-method";
import type { CancellationMethodId } from "./cancellation-method-id";

export type ICancellationMethodRepository = {
  find: (
    userId: UserId,
    cancellationMethodId: CancellationMethodId,
  ) => Promise<Result<ICancellationMethod, undefined>>;

  findAll: (
    userId: UserId,
  ) => Promise<Result<ICancellationMethod[], undefined>>;
};
