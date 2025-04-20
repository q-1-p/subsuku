import { type NextRequest, NextResponse } from "next/server";

import type { Currency } from "@/domain/currency";
import type { IntervalUnit } from "@/domain/interval";
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
    return NextResponse.json({ message: "認証エラー" }, { status: 401 });
  }

  const formData = await req.formData();
  const subscriptionRegistered = SubscriptionRegistered.factory(
    formData.get("name") as string,
    Number(formData.get("price")),
    Number(formData.get("currency")) as Currency,
    new Date(formData.get("nextUpdate") as string),
    Number(formData.get("intervalCycle")),
    Number(formData.get("intervalUnit")) as IntervalUnit,
  );
  if (subscriptionRegistered.type === err) {
    console.log(subscriptionRegistered.error);
    return NextResponse.json(
      { message: "登録しようとした値が不正です" },
      { status: 400 },
    );
  }

  const isRegistered = await subscriptionRepository.registerSubscription(
    userResult.value.id,
    subscriptionRegistered.value,
  );

  return NextResponse.json({ status: isRegistered ? 200 : 400 });
}
