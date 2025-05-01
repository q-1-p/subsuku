import type { User } from "@/domain/user/user";
import type { Result } from "@/lib/result";
import type { UserId } from "./user-id";

export interface IUserRepository {
  findId: (clerkUserId: string) => Promise<Result<UserId, undefined>>;
  find: (clerkUserId: string) => Promise<Result<User, undefined>>;
}
