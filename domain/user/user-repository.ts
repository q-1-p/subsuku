import type { Result } from "@/lib/result";
import type { UserId } from "../type";

export interface IUserRepository {
  findId: (clerkUserId: string) => Promise<Result<UserId, undefined>>;

  updateMailAddress: (userId: UserId, mailAddress: string) => Promise<boolean>;

  delete: (userId: UserId, clerkUserId: string) => Promise<boolean>;
}
