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
    return NextResponse.json({ status: 401 });
  }

  const monthlyPriceResult =
    await subscriptionRepository.fetchSubscriptionsMonthlyPrice(
      userResult.value.id,
    );
  switch (monthlyPriceResult.type) {
    case ok:
      return NextResponse.json(monthlyPriceResult.value, { status: 200 });
    case err:
      return NextResponse.json({ status: 400 });
  }
}
