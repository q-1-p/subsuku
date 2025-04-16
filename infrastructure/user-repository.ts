import { eq } from "drizzle-orm";

import { db } from "@/db";
import { User } from "@/domain/user/user";
import { UserId } from "@/domain/user/user-id";
import type { IUserRepository } from "@/domain/user/user-repository";
import { type Result, err, ok } from "@/lib/result";

export class UserRepository implements IUserRepository {
  public fetchUser = async (
    clerkUserId: string,
  ): Promise<Result<User, string>> =>
    await db.query.users
      .findFirst({
        where: (user) => eq(user.clerkId, clerkUserId),
      })
      .then((user) => {
        if (!user) {
          return { type: err as typeof err, error: "User not found" };
        }

        const userIdResult = UserId.factory(user.id);
        if (userIdResult.type === err) {
          return { type: err as typeof err, error: "" };
        }

        const userResult = User.factory(userIdResult.value, user.mailAddress);
        if (userResult.type === err) {
          return { type: err as typeof err, error: "" };
        }

        return {
          type: ok as typeof ok,
          value: userResult.value,
        };
      })
      .catch((error) => ({ type: err as typeof err, error: String(error) }));
}
