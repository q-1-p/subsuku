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
  const userIdResult = await userRepository.findId(
    req.headers.get("Authorization") as string,
  );
  if (userIdResult.type === err) {
    return NextResponse.json({}, { status: 401 });
  }

  const monthlyFeeResult = await subscriptionRepository.fetchMonthlyFee(
    userIdResult.value,
  );
  switch (monthlyFeeResult.type) {
    case ok:
      return NextResponse.json(monthlyFeeResult.value, { status: 200 });
    case err:
      return NextResponse.json({}, { status: 400 });
  }
}
