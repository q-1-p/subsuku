import type { User } from "@/domain/user/user";
import type { Result } from "@/lib/result";

export interface IUserRepository {
  find: (clerkUserId: string) => Promise<Result<User, undefined>>;
}
