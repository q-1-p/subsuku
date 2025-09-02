import { type NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";

import { err } from "@/lib/result";

import {
  type SubscriptionDetail,
  validateSubscription,
  validateSubscriptionId,
} from "@/domain/type";
import { SubscriptionRepository } from "@/infrastructure/subscription-repository";
import { UserRepository } from "@/infrastructure/user-repository";

import type { ISubscriptionRepository } from "@/domain/subscription/subscription-repository";
import type { IUserRepository } from "@/domain/user/user-repository";

const userRepository: IUserRepository = new UserRepository();
const subscriptionRepository: ISubscriptionRepository =
  new SubscriptionRepository();

export async function GET(req: NextRequest) {
  return await fetch(
    `${process.env.BACKEND_URL}/subscription/${req.nextUrl.searchParams.get("id")}`,
    {
      cache: "no-store",
      headers: {
        Authorization: req.headers.get("Authorization") as string,
      },
      method: "GET",
    },
  )
    .then((res) => {
      if (!res.ok) {
        return NextResponse.json({}, { status: res.status });
      }

      return res.json();
    })
    .then((subscription) => {
      return NextResponse.json(
        {
          id: subscription.id,
          name: subscription.name,
          fee: subscription.fee,
          amount: subscription.amount,
          currencyId: subscription.currency_id,
          nextUpdate: subscription.next_update,
          updateCycle: {
            number: subscription.update_cycle_number,
            unit: subscription.update_cycle_unit_id,
          },
          linkCancellationMethodId: subscription.linked_cancellation_method_id,
        } as SubscriptionDetail,
        { status: 200 },
      );
    })
    .catch((error) => {
      console.error(error);
      return NextResponse.json({}, { status: 400 });
    });
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
      number: Number(formData.get("updateCycle.number")),
      unit: Number(formData.get("updateCycle.unit")),
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
      number: Number(formData.get("updateCycle.number")),
      unit: Number(formData.get("updateCycle.unit")),
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
