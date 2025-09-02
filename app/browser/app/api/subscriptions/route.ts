import { type NextRequest, NextResponse } from "next/server";

import type { SubscriptionDetail } from "@/domain/type";

export async function GET(req: NextRequest) {
  return await fetch(`${process.env.BACKEND_URL}/subscriptions`, {
    cache: "no-store",
    headers: {
      Authorization: req.headers.get("Authorization") as string,
    },
    method: "GET",
  })
    .then((res) => {
      if (!res.ok) {
        return NextResponse.json({}, { status: res.status });
      }

      return res.json();
    })
    .then((data) => {
      const subscriptions = data.map((datum) => {
        return {
          id: datum.id,
          name: datum.name,
          fee: datum.fee,
          amount: datum.amount,
          currencyId: datum.currency_id,
          nextUpdate: datum.next_update,
          updateCycle: {
            number: datum.update_cycle_number,
            unit: datum.update_cycle_unit_id,
          },
          linkCancellationMethodId: datum.linked_cancellation_method_id,
        } as SubscriptionDetail;
      });
      return NextResponse.json(subscriptions, { status: 200 });
    })
    .catch((error) => {
      console.error(error);
      return NextResponse.json({}, { status: 400 });
    });
}
