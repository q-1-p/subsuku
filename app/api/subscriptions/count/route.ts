import { type NextRequest, NextResponse } from "next/server";

import { err, ok } from "@/lib/result";

import { SubscriptionRepository } from "@/infrastructure/subscription-repository";
import { UserRepository } from "@/infrastructure/user-repository";

import type { IUserRepository } from "@/domain/user/user-repository";

const userRepository: IUserRepository = new UserRepository();
const subscriptionRepository = new SubscriptionRepository();

export async function GET(req: NextRequest) {
  const userIdResult = await userRepository.findId(
    req.headers.get("Authorization") as string,
  );
  if (userIdResult.type === err) {
    return NextResponse.json({}, { status: 401 });
  }

  const countResult = await subscriptionRepository.count(userIdResult.value);
  switch (countResult.type) {
    case ok:
      return NextResponse.json(countResult.value, { status: 200 });
    case err:
      return NextResponse.json({}, { status: 400 });
  }
}
