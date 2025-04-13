import type { WebhookEvent } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { Webhook } from "svix";

import { db } from "@/db";
import { users } from "@/db/schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // POSTリクエストのみを許可
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("CLERK_WEBHOOK_SECRET is not set");
    return res.status(500).json({ error: "Server configuration error" });
  }

  // リクエストボディを取得
  // Next.jsはすでにボディをパースしている場合があるので、rawBodyを使用するか、JSON文字列に変換
  let payload: string;
  if (typeof req.body === "string") {
    payload = req.body;
  } else {
    payload = JSON.stringify(req.body);
  }

  // ヘッダーの取得と検証
  const headers = req.headers;

  // 必要なヘッダーが存在するか確認
  if (
    !headers["svix-id"] ||
    !headers["svix-timestamp"] ||
    !headers["svix-signature"]
  ) {
    console.error("Missing Svix headers", headers);
    return res.status(400).json({ error: "Missing Svix headers" });
  }

  const svixHeaders = {
    "svix-id": headers["svix-id"] as string,
    "svix-timestamp": headers["svix-timestamp"] as string,
    "svix-signature": headers["svix-signature"] as string,
  };

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
        email: email_addresses[0]?.email_address ?? "",
        clerkId: id,
      });
    }
  }

  // 成功レスポンスを返す
  return res.status(200).json({ success: true });
}
