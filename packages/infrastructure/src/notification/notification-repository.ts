import { db } from "..";

import { err, ok, type Result } from "@/functional/result";
import { notificationTable } from "@/infrastructure/schema";

import type { Notification } from "@/domain/notification/notification";
import type { INotificationRepository } from "@/domain/notification/notification-repository";

export class NotificationRepository implements INotificationRepository {
  async findAll(): Promise<Result<Notification[], undefined>> {
    return await db
      .select()
      .from(notificationTable)
      .orderBy(notificationTable.updatedAt)
      .then((notifications) => {
        return {
          type: ok as typeof ok,
          value: notifications,
        };
      })
      .catch((error) => {
        console.error(error);
        return { type: err as typeof err, error: undefined };
      });
  }
}
