import { type Result, err, ok } from "@/lib/result";
import type { UserId } from "./user-id";

export class User {
  public readonly id: UserId;
  public readonly mailAddress: string;

  private constructor(userId: UserId, mailAddress: string) {
    this.id = userId;
    this.mailAddress = mailAddress;
  }

  public static factory(
    userId: UserId,
    mailAddress: string,
  ): Result<User, string> {
    if (
      !/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
        mailAddress,
      )
    ) {
      return { type: err, error: "Invalid mail address" };
    }

    return {
      type: ok as typeof ok,
      value: new User(userId, mailAddress),
    };
  }
}
