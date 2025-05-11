import type { Result } from "@/lib/result";
import type { UserId } from "../user/user-id";
import type { ICancellationMethod } from "./cancellation-method";
import type { CancellationMethodId } from "./cancellation-method-id";
import type { CancellationMethodRegistered } from "./cancellation-method-registered";
import type { CancellationMethodUpdated } from "./cancellation-method-updated";

export type ICancellationMethodRepository = {
  find: (
    userId: UserId,
    cancellationMethodId: CancellationMethodId,
  ) => Promise<Result<ICancellationMethod, undefined>>;
  search: (
    userId: UserId,
    searchQuery: string,
    onlyMine: boolean,
    onlyBookmarked: boolean,
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

  add: (
    cancellationMethodRegistered: CancellationMethodRegistered,
  ) => Promise<boolean>;
  addBookmark: (
    userId: UserId,
    cancellationMethodId: CancellationMethodId,
  ) => Promise<boolean>;
  addGood: (
    userId: UserId,
    cancellationMethodId: CancellationMethodId,
  ) => Promise<boolean>;

  update: (
    userId: UserId,
    cancellationMethodUpdated: CancellationMethodUpdated,
  ) => Promise<boolean>;

  delete: (
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
