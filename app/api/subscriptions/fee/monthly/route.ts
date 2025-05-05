import { type NextRequest, NextResponse } from "next/server";

import type { IUserRepository } from "@/domain/user/user-repository";
import { CurrencyRepository } from "@/infrastructure/currency-repository";
import { SubscriptionRepository } from "@/infrastructure/subscription-repository";
import { UserRepository } from "@/infrastructure/user-repository";
import { err, ok } from "@/lib/result";

const userRepository: IUserRepository = new UserRepository();
const subscriptionRepository = new SubscriptionRepository(
  new CurrencyRepository(),
);

export async function GET(req: NextRequest) {
  const userResult = await userRepository.find(
    req.headers.get("Authorization") as string,
  );
  if (userResult.type === err) {
    return NextResponse.json({}, { status: 401 });
  }

  const monthlyFeeResult = await subscriptionRepository.fetchMonthlyFee(
    userResult.value.id,
  );
  switch (monthlyFeeResult.type) {
    case ok:
      return NextResponse.json(monthlyFeeResult.value, { status: 200 });
    case err:
      return NextResponse.json({}, { status: 400 });
  }
}
