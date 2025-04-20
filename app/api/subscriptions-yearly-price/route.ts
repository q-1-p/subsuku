import { type NextRequest, NextResponse } from "next/server";

import type { IUserRepository } from "@/domain/user/user-repository";
import { SubscriptionRepository } from "@/infrastructure/subscription-repository";
import { UserRepository } from "@/infrastructure/user-repository";
import { err, ok } from "@/lib/result";

const userRepository: IUserRepository = new UserRepository();
const subscriptionRepository = new SubscriptionRepository();

export async function GET(req: NextRequest) {
  const userResult = await userRepository.fetchUser(
    req.headers.get("Authorization") as string,
  );
  if (userResult.type === err) {
    return NextResponse.json({ message: "認証エラー" }, { status: 401 });
  }

  const yearlyPriceResult =
    await subscriptionRepository.fetchSubscriptionsYearlyPrice(
      userResult.value.id,
    );

  switch (yearlyPriceResult.type) {
    case ok:
      return NextResponse.json(yearlyPriceResult.value, { status: 200 });
    case err:
      return NextResponse.json(
        { message: "サブスクリプションの取得に失敗しました" },
        { status: 416 },
      );
  }
}
