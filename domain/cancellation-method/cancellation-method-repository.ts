import type { Result } from "@/lib/result";
import type { CancellationMethod, CancellationMethodId, UserId } from "../type";
import type { ICancellationMethod } from "./cancellation-method";

export type ICancellationMethodRepository = {
  find: (
    userId: UserId,
    cancellationMethodId: CancellationMethodId,
  ) => Promise<Result<ICancellationMethod, undefined>>;
  searchForName: (
    searchQuery: string,
  ) => Promise<Result<ICancellationMethod[], undefined>>;
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
    userId: UserId,
    cancellationMethod: CancellationMethod,
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
    cancellationMethod: CancellationMethod,
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
