import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";

import { db } from "@/db";
import { UserId } from "@/domain/user/user-id";
import type { IUserRepository } from "@/domain/user/user-repository";
import { type Result, err, ok } from "@/lib/result";

const findUserQuery = db.query.usersTable
  .findFirst({
    where: (user) => eq(user.clerkId, sql.placeholder("clerkUserId")),
  })
  .prepare("find");

export class UserRepository implements IUserRepository {
  public findId = async (
    clerkUserId: string,
  ): Promise<Result<UserId, undefined>> => {
    return findUserQuery
      .execute({ clerkUserId })
      .then((user) => {
        if (!user) {
          throw new Error("User not found");
        }

        const userIdResult = UserId.factory(user.id);
        if (userIdResult.type === err) {
          throw new Error("Invalid user ID");
        }

        return {
          type: ok as typeof ok,
          value: userIdResult.value,
        };
      })
      .catch((error) => {
        console.error(error);
        return { type: err as typeof err, error: undefined };
      });
  };
}
