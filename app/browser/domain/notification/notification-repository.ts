import type { Result } from "@/lib/result";
import type { Notification } from "./notification";

export interface INotificationRepository {
  findAll(): Promise<Result<Notification[], undefined>>;
}
