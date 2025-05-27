import { type NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";

import type { ISubscriptionRepository } from "@/domain/subscription/subscription-repository";
import { validateSubscription, validateSubscriptionId } from "@/domain/type";
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

  const subscriptionIdResult = validateSubscriptionId(
    req.nextUrl.searchParams.get("id"),
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
  const subscriptionRegistered = validateSubscription({
    id: v4(),
    name: formData.get("name") as string,
    active: true,
    amount: Number(formData.get("amount")),
    currencyId: Number(formData.get("currencyId")),
    nextUpdate: new Date(formData.get("nextUpdate") as string),
    updateCycle: {
      number: Number(formData.get("intervalCycle")),
      unit: Number(formData.get("intervalId")),
    },
  });
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
  const subscriptionUpdated = validateSubscription({
    id: formData.get("id") as string,
    name: formData.get("name") as string,
    active: true,
    amount: Number(formData.get("amount")),
    currencyId: Number(formData.get("currencyId")),
    nextUpdate: new Date(formData.get("nextUpdate") as string),
    updateCycle: {
      number: Number(formData.get("intervalCycle")),
      unit: Number(formData.get("intervalId")),
    },
  });
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
  const subscriptionIdResult = validateSubscriptionId(
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
