import { type NextRequest, NextResponse } from "next/server";

import type { CurrencyId } from "@/domain/currency/currency-id";
import type { IntervalUnit } from "@/domain/interval";
import { SubscriptionId } from "@/domain/subscription/subscription-id";
import { SubscriptionRegistered } from "@/domain/subscription/subscription-registered";
import type { ISubscriptionRepository } from "@/domain/subscription/subscription-repository";
import type { IUserRepository } from "@/domain/user/user-repository";
import { SubscriptionRepository } from "@/infrastructure/subscription-repository";
import { UserRepository } from "@/infrastructure/user-repository";
import { err } from "@/lib/result";

const userRepository: IUserRepository = new UserRepository();
const subscriptionRepository: ISubscriptionRepository =
  new SubscriptionRepository();

export async function POST(req: NextRequest) {
  const userResult = await userRepository.fetchUser(
    req.headers.get("Authorization") as string,
  );
  if (userResult.type === err) {
    return NextResponse.json({ status: 401 });
  }

  const formData = await req.formData();
  const subscriptionRegistered = SubscriptionRegistered.factory(
    formData.get("name") as string,
    Number(formData.get("price")),
    Number(formData.get("currency")) as CurrencyId,
    new Date(formData.get("nextUpdate") as string),
    Number(formData.get("intervalCycle")),
    Number(formData.get("intervalUnit")) as IntervalUnit,
  );
  if (subscriptionRegistered.type === err) {
    console.log(subscriptionRegistered.error);
    return NextResponse.json({ status: 400 });
  }

  const isRegistered = await subscriptionRepository.registerSubscription(
    userResult.value.id,
    subscriptionRegistered.value,
  );

  return NextResponse.json({ status: isRegistered ? 200 : 400 });
}

export async function DELETE(req: NextRequest) {
  console.log(req);
  const userResult = await userRepository.fetchUser(
    req.headers.get("Authorization") as string,
  );
  if (userResult.type === err) {
    return NextResponse.json({ status: 401 });
  }

  const formData = await req.formData();
  const subscriptionIdResult = SubscriptionId.factory(
    formData.get("subscriptionId") as string,
  );
  if (subscriptionIdResult.type === err) {
    return NextResponse.json({ status: 400 });
  }

  const result = await subscriptionRepository.deleteSubscription(
    userResult.value.id,
    subscriptionIdResult.value,
  );

  return NextResponse.json({ status: result ? 200 : 400 });
}
