import { type NextRequest, NextResponse } from "next/server";

import type { ISubscriptionRepository } from "@/domain/subscription/subscription-repository";
import {
  validateCancellationMethodId,
  validateSubscriptionId,
} from "@/domain/type";
import type { IUserRepository } from "@/domain/user/user-repository";
import { SubscriptionRepository } from "@/infrastructure/subscription-repository";
import { UserRepository } from "@/infrastructure/user-repository";
import { err } from "@/lib/result";

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
