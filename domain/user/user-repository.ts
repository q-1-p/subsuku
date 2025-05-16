import type { Result } from "@/lib/result";
import type { UserId } from "./user-id";

export interface IUserRepository {
  findId: (clerkUserId: string) => Promise<Result<UserId, undefined>>;
}
