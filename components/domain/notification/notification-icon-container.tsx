import "server-only";

import { fetchNotifications } from "./_lib/fetcher";
import { NotificationIconPresentation } from "./notification-icon-presentation";

export async function NotificationIcon() {
  return (
    <NotificationIconPresentation notifications={await fetchNotifications()} />
  );
}
