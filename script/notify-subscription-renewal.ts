import { db } from "@/db";
import { subscriptionsTable, usersTable } from "@/db/schema";
import { addDays, formatDate } from "date-fns";
import { eq } from "drizzle-orm";
import nodemailer from "nodemailer";

export const sendMail = async () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const nextDate = formatDate(addDays(new Date(), 1), "yyyy-MM-dd");
  const subscriptions: Map<string, string[]> = await db
    .select({
      mailAddress: usersTable.mailAddress,
      subscriptionName: subscriptionsTable.name,
    })
    .from(subscriptionsTable)
    .where(eq(subscriptionsTable.nextUpdate, nextDate))
    .leftJoin(usersTable, eq(subscriptionsTable.userId, usersTable.id))
    .then((res) =>
      res.reduce((acc, item) => {
        // mailAddressがnullの場合はスキップ
        if (item.mailAddress === null) {
          return acc;
        }

        if (!acc.has(item.mailAddress)) {
          acc.set(item.mailAddress, []);
        }
        acc.get(item.mailAddress)?.push(item.subscriptionName);
        return acc;
      }, new Map<string, string[]>()),
    );

  for (const [mailAddress, subscriptionNames] of subscriptions) {
    const mailOptions = {
      from: `さぶ空く <${process.env.MAIL_ADDRESS_FOR_NOTIFICATION}>`,
      to: mailAddress,
      subject: "サブスクリプション更新通知メール",
      html: `
      <html>
        <body>
          <p>明日、以下のサブスクリプションが更新されます</p>
          <ul>
            ${subscriptionNames.map((name) => `<li>${name}</li>`).join("")}
          </ul>
        </body>
      </html>`,
    };

    await transporter.sendMail(mailOptions);
  }

  console.log(`${subscriptions.size}件のメールを送信しました`);
};

// スクリプトが直接実行された場合にシード関数を実行
if (require.main === module) {
  sendMail()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("メール送信でエラーが発生しました:", error);
      process.exit(1);
    });
}
