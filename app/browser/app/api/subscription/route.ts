import { format } from "date-fns";
import { type NextRequest, NextResponse } from "next/server";

import type { SubscriptionDetail } from "@/domain/type";

export async function GET(req: NextRequest) {
  return fetch(
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
  const formData = await req.formData();
  return fetch(`${process.env.BACKEND_URL}/subscription`, {
    cache: "no-store",
    headers: {
      Authorization: req.headers.get("Authorization") as string,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      name: formData.get("name") as string,
      active: true,
      amount: Number(formData.get("amount")),
      currency_id: Number(formData.get("currency_id")),
      next_update: format(
        new Date(formData.get("next_update") as string),
        "yyyy-MM-dd",
      ),
      update_cycle_number: Number(formData.get("update_cycle_number")),
      update_cycle_unit_id: Number(formData.get("update_cycle_unit_id")),
    }),
  })
    .then((res) => NextResponse.json({}, { status: res.status }))
    .catch((error) => {
      console.error(error);
      return NextResponse.json({}, { status: 400 });
    });
}

export async function PUT(req: NextRequest) {
  const formData = await req.formData();
  return fetch(`${process.env.BACKEND_URL}/subscription`, {
    cache: "no-store",
    headers: {
      Authorization: req.headers.get("Authorization") as string,
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({
      id: formData.get("id") as string,
      name: formData.get("name") as string,
      active: true,
      amount: Number(formData.get("amount")),
      currency_id: Number(formData.get("currency_id")),
      next_update: format(
        new Date(formData.get("next_update") as string),
        "yyyy-MM-dd",
      ),
      update_cycle_number: Number(formData.get("update_cycle_number")),
      update_cycle_unit_id: Number(formData.get("update_cycle_unit_id")),
    }),
  })
    .then((res) => NextResponse.json({}, { status: res.status }))
    .catch((error) => {
      console.error(error);
      return NextResponse.json({}, { status: 400 });
    });
}

export async function DELETE(req: NextRequest) {
  const formData = await req.formData();
  return fetch(`${process.env.BACKEND_URL}/subscription`, {
    cache: "no-store",
    headers: {
      Authorization: req.headers.get("Authorization") as string,
      "Content-Type": "application/json",
    },
    method: "DELETE",
    body: formData.get("subscriptionId"),
  })
    .then((res) => NextResponse.json({}, { status: res.status }))
    .catch((error) => {
      console.error(error);
      return NextResponse.json({}, { status: 400 });
    });
}
