import type { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";

import { db } from "@/db";
import { users } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("Received webhook request");

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    console.error("Missing CLERK_WEBHOOK_SECRET");
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }

  // リクエストボディを取得
  const payload = await req.text();

  // ヘッダーの取得と検証
  const headersList = req.headers;

  // Next.jsのHeadersListからヘッダーを正しく取得
  const svixId = headersList.get("svix-id");
  const svixTimestamp = headersList.get("svix-timestamp");
  const svixSignature = headersList.get("svix-signature");

  // 必要なヘッダーが存在するか確認
  if (!svixId || !svixTimestamp || !svixSignature) {
    console.error("Missing Svix headers", {
      svixId,
      svixTimestamp,
      svixSignature,
    });
    return NextResponse.json({ message: "Invalid headers" }, { status: 416 });
  }

  const svixHeaders = {
    "svix-id": svixId,
    "svix-timestamp": svixTimestamp,
    "svix-signature": svixSignature,
  };

  try {
    const evt = new Webhook(WEBHOOK_SECRET).verify(
      payload,
      svixHeaders,
    ) as WebhookEvent;

    if (evt.type === "user.created") {
      const { id, email_addresses } = evt.data;

      const existingUser = await db.query.users.findFirst({
        where: (fields, { eq }) => eq(fields.clerkId, id),
      });

      if (!existingUser) {
        await db.insert(users).values({
          mailAddress: email_addresses[0]?.email_address ?? "",
          clerkId: id,
        });
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook verification error:", error);
    return NextResponse.json(
      { message: "Webhook verification failed" },
      { status: 400 },
    );
  }
}
