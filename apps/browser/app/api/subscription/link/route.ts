import { type NextRequest, NextResponse } from "next/server";

import {
  validateCancellationMethodId,
  validateSubscriptionId,
} from "@/domain/type";
import { err } from "@/functional/result";
import { SubscriptionRepository } from "@/infrastructure/subscription/subscription-repository";
import { UserRepository } from "@/infrastructure/user/user-repository";

import type { ISubscriptionRepository } from "@/domain/subscription/subscription-repository";
import type { IUserRepository } from "@/domain/user/user-repository";

const userRepository: IUserRepository = new UserRepository();
const subscriptionRepository: ISubscriptionRepository =
  new SubscriptionRepository();

export async function PATCH(req: NextRequest) {
  const userIdResult = await userRepository.findId(
    req.headers.get("Authorization") as string,
  );
  if (userIdResult.type === err) {
    return NextResponse.json({}, { status: 401 });
  }

  const formData = await req.formData();
  const subscriptionIdResult = validateSubscriptionId(
    formData.get("subscriptionId"),
  );
  const cancellationMethodIdResult = validateCancellationMethodId(
    formData.get("cancellationMethodId"),
  );
  if (
    subscriptionIdResult.type === err ||
    cancellationMethodIdResult.type === err
  ) {
    return NextResponse.json({}, { status: 400 });
  }

  const result = await subscriptionRepository.linkCancellationMethod(
    userIdResult.value,
    subscriptionIdResult.value,
    cancellationMethodIdResult.value,
  );

  return NextResponse.json({}, { status: result ? 200 : 400 });
}
