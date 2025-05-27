import type { Result } from "@/lib/result";
import type {
  CancellationMethod,
  CancellationMethodDetail,
  CancellationMethodId,
  UserId,
} from "../type";

export type ICancellationMethodRepository = {
  find: (
    userId: UserId,
    cancellationMethodId: CancellationMethodId,
  ) => Promise<Result<CancellationMethodDetail, undefined>>;
  searchForName: (
    searchQuery: string,
  ) => Promise<Result<CancellationMethodDetail[], undefined>>;
  search: (
    userId: UserId,
    searchQuery: string,
    onlyMine: boolean,
    onlyBookmarked: boolean,
  ) => Promise<Result<CancellationMethodDetail[], undefined>>;

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
