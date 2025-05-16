import { type NextRequest, NextResponse } from "next/server";

import type { CurrencyId } from "@/domain/currency/currency-id";
import type { IntervalId } from "@/domain/interval/interval-id";
import { SubscriptionId } from "@/domain/subscription/subscription-id";
import { SubscriptionRegistered } from "@/domain/subscription/subscription-registered";
import type { ISubscriptionRepository } from "@/domain/subscription/subscription-repository";
import { SubscriptionUpdated } from "@/domain/subscription/subscription-updated";
import type { IUserRepository } from "@/domain/user/user-repository";
import { SubscriptionRepository } from "@/infrastructure/subscription-repository";
import { UserRepository } from "@/infrastructure/user-repository";
import { err } from "@/lib/result";

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

  const subscriptionIdResult = SubscriptionId.factory(
    req.nextUrl.searchParams.get("id") as string,
  );
  if (subscriptionIdResult.type === err) {
    return NextResponse.json({}, { status: 400 });
  }

  const subscriptionResult = await subscriptionRepository.find(
    userIdResult.value,
    subscriptionIdResult.value,
  );
  if (subscriptionResult.type === err) {
    return NextResponse.json({}, { status: 400 });
  }

  return NextResponse.json(subscriptionResult.value, { status: 200 });
}

export async function POST(req: NextRequest) {
  const userIdResult = await userRepository.findId(
    req.headers.get("Authorization") as string,
  );
  if (userIdResult.type === err) {
    return NextResponse.json({}, { status: 401 });
  }

  const formData = await req.formData();
  const subscriptionRegistered = SubscriptionRegistered.factory(
    formData.get("name") as string,
    Number(formData.get("amount")),
    Number(formData.get("currencyId")) as CurrencyId,
    new Date(formData.get("nextUpdate") as string),
    Number(formData.get("intervalId")) as IntervalId,
    Number(formData.get("intervalCycle")),
  );
  if (subscriptionRegistered.type === err) {
    return NextResponse.json({}, { status: 400 });
  }

  const isRegistered = await subscriptionRepository.insert(
    userIdResult.value,
    subscriptionRegistered.value,
  );

  return NextResponse.json({ status: isRegistered ? 200 : 400 });
}

export async function PUT(req: NextRequest) {
  const userIdResult = await userRepository.findId(
    req.headers.get("Authorization") as string,
  );
  if (userIdResult.type === err) {
    return NextResponse.json({}, { status: 401 });
  }

  const formData = await req.formData();
  const subscriptionUpdated = SubscriptionUpdated.factory(
    formData.get("id") as string,
    formData.get("name") as string,
    Number(formData.get("amount")),
    Number(formData.get("currencyId")) as CurrencyId,
    new Date(formData.get("nextUpdate") as string),
    Number(formData.get("intervalId")) as IntervalId,
    Number(formData.get("intervalCycle")),
  );
  if (subscriptionUpdated.type === err) {
    return NextResponse.json({}, { status: 400 });
  }

  const isUpdated = await subscriptionRepository.update(
    userIdResult.value,
    subscriptionUpdated.value,
  );

  return NextResponse.json({}, { status: isUpdated ? 200 : 400 });
}

export async function DELETE(req: NextRequest) {
  const userIdResult = await userRepository.findId(
    req.headers.get("Authorization") as string,
  );
  if (userIdResult.type === err) {
    return NextResponse.json({}, { status: 401 });
  }

  const formData = await req.formData();
  const subscriptionIdResult = SubscriptionId.factory(
    formData.get("subscriptionId") as string,
  );
  if (subscriptionIdResult.type === err) {
    return NextResponse.json({}, { status: 400 });
  }

  const result = await subscriptionRepository.delete(
    userIdResult.value,
    subscriptionIdResult.value,
  );

  return NextResponse.json({}, { status: result ? 200 : 400 });
}
