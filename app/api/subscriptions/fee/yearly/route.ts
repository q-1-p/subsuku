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
  const userResult = await userRepository.find(
    req.headers.get("Authorization") as string,
  );
  if (userResult.type === err) {
    return NextResponse.json({}, { status: 401 });
  }

  const yearlyFeeResult = await subscriptionRepository.fetchYearlyFee(
    userResult.value.id,
  );

  switch (yearlyFeeResult.type) {
    case ok:
      return NextResponse.json(yearlyFeeResult.value, { status: 200 });
    case err:
      return NextResponse.json({}, { status: 400 });
  }
}
