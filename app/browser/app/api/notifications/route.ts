import { NextResponse } from "next/server";

import type { Notification } from "@/domain/notification/notification";

export async function GET() {
  return await fetch(`${process.env.BACKEND_URL}/notifications`, {
    cache: "no-store",
    method: "GET",
  })
    .then((res) => {
      if (!res.ok) {
        return NextResponse.json({}, { status: res.status });
      }

      return res.json();
    })
    .then((data) => {
      console.debug("data", data);
      const notifications = data.map((datum) => {
        return {
          title: datum.title,
          pageUrl: datum.page_url,
          updatedAt: datum.updated_at,
        } as Notification;
      });
      return NextResponse.json(notifications, { status: 200 });
    })
    .catch((error) => {
      console.error(error);
      return NextResponse.json({}, { status: 400 });
    });
}
