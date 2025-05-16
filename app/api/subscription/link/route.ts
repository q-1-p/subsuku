import { type NextRequest, NextResponse } from "next/server";

import { CancellationMethodId } from "@/domain/cancellation-method/cancellation-method-id";
import { SubscriptionId } from "@/domain/subscription/subscription-id";
import type { ISubscriptionRepository } from "@/domain/subscription/subscription-repository";
import type { IUserRepository } from "@/domain/user/user-repository";
import { SubscriptionRepository } from "@/infrastructure/subscription-repository";
import { UserRepository } from "@/infrastructure/user-repository";
import { err } from "@/lib/result";

const userRepository: IUserRepository = new UserRepository();
const subscriptionRepository: ISubscriptionRepository =
  new SubscriptionRepository();

export async function PATCH(req: NextRequest) {
  const userResult = await userRepository.find(
    req.headers.get("Authorization") as string,
  );
  if (userResult.type === err) {
    return NextResponse.json({}, { status: 401 });
  }

  const formData = await req.formData();
  const subscriptionIdResult = SubscriptionId.factory(
    formData.get("subscriptionId") as string,
  );
  const cancellationMethodIdResult = CancellationMethodId.factory(
    formData.get("cancellationMethodId") as string,
  );
  if (
    subscriptionIdResult.type === err ||
    cancellationMethodIdResult.type === err
  ) {
    return NextResponse.json({}, { status: 400 });
  }

  const result = await subscriptionRepository.linkCancellationMethod(
    userResult.value.id,
    subscriptionIdResult.value,
    cancellationMethodIdResult.value,
  );

  return NextResponse.json({}, { status: result ? 200 : 400 });
}
