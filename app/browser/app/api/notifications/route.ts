import { NextResponse } from "next/server";

import { err, ok } from "@/lib/result";

import { NotificationRepository } from "@/infrastructure/notification-repository";

const notificationRepository = new NotificationRepository();

export async function GET() {
  const notificationsResult = await notificationRepository.findAll();
  switch (notificationsResult.type) {
    case ok:
      return NextResponse.json(notificationsResult.value, { status: 200 });
    case err:
      return NextResponse.json({}, { status: 400 });
  }
}
