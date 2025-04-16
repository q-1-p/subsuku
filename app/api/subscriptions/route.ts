import { type NextRequest, NextResponse } from "next/server";

import type { ISubscriptionRepository } from "@/domain/subscription/subscription-repository";
import type { IUserRepository } from "@/domain/user/user-repository";
import { SubscriptionRepository } from "@/infrastructure/subscription-repository";
import { UserRepository } from "@/infrastructure/user-repository";
import { err, ok } from "@/lib/result";

const userRepository: IUserRepository = new UserRepository();
const subscriptionRepository: ISubscriptionRepository =
  new SubscriptionRepository();

export async function GET(req: NextRequest) {
  const userResult = await userRepository.fetchUser(
    req.nextUrl.searchParams.get("clerkUserid") as string,
  );
  if (userResult.type === err) {
    return NextResponse.json({ message: "認証エラー" }, { status: 401 });
  }

  const subscriptionsResult = await subscriptionRepository.fetchSubscriptions(
    userResult.value.id,
    req.nextUrl.searchParams.get("active") !== "false",
    req.nextUrl.searchParams.get("upcoming") === "true",
  );
  switch (subscriptionsResult.type) {
    case ok:
      return NextResponse.json(subscriptionsResult.value, { status: 200 });
    case err:
      return NextResponse.json(
        { message: "サブスクリプションの取得に失敗しました" },
        { status: 416 },
      );
  }
}
