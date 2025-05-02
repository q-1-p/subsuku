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

  isBookmarked: (
    userId: UserId,
    cancellationMethodId: CancellationMethodId,
  ) => Promise<Result<boolean, undefined>>;
  evaluatedGood: (
    userId: UserId,
    cancellationMethodId: CancellationMethodId,
  ) => Promise<Result<boolean, undefined>>;

  countBookmarks: (
    cancellationMethodId: CancellationMethodId,
  ) => Promise<Result<number, undefined>>;
  countGoods: (
    cancellationMethodId: CancellationMethodId,
  ) => Promise<Result<number, undefined>>;

  addBookmark: (
    userId: UserId,
    cancellationMethodId: CancellationMethodId,
  ) => Promise<boolean>;
  addGood: (
    userId: UserId,
    cancellationMethodId: CancellationMethodId,
  ) => Promise<boolean>;

  deleteBookmark: (
    userId: UserId,
    cancellationMethodId: CancellationMethodId,
  ) => Promise<boolean>;
  deleteGood: (
    userId: UserId,
    cancellationMethodId: CancellationMethodId,
  ) => Promise<boolean>;
};
