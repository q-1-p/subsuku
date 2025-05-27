import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { type UserId, validateUserId } from "@/domain/type";
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

        const userIdResult = validateUserId(user.id);
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

  public updateMailAddress = async (
    userId: UserId,
    mailAddress: string,
  ): Promise<boolean> => {
    return db
      .update(usersTable)
      .set({ mailAddress })
      .where(eq(usersTable.id, userId))
      .then(() => true)
      .catch((error) => {
        console.error("Failed to update mail address", error);
        return false;
      });
  };
}
