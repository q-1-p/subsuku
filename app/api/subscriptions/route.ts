import { type NextRequest, NextResponse } from "next/server";

import { err, ok } from "@/lib/result";

import { SubscriptionRepository } from "@/infrastructure/subscription-repository";
import { UserRepository } from "@/infrastructure/user-repository";

import type { ISubscriptionRepository } from "@/domain/subscription/subscription-repository";
import type { IUserRepository } from "@/domain/user/user-repository";

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

  const subscriptionsResult = await subscriptionRepository.findAll(
    userIdResult.value,
    req.nextUrl.searchParams.get("active") !== "false",
    req.nextUrl.searchParams.get("upcoming") === "true",
  );
  switch (subscriptionsResult.type) {
    case ok:
      return NextResponse.json(subscriptionsResult.value, { status: 200 });
    case err:
      return NextResponse.json({}, { status: 400 });
  }
}
