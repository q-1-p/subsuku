import type { User } from "@/domain/user/user";
import type { Result } from "@/lib/result";

export interface IUserRepository {
  fetchUser: (clerkUserId: string) => Promise<Result<User, undefined>>;
}
