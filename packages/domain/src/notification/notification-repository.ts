import type { Result } from "@/functional/result";
import type { Notification } from "./notification";

export interface INotificationRepository {
  findAll(): Promise<Result<Notification[], undefined>>;
}
