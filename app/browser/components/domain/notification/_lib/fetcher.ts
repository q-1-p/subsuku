import type { Notification } from "@/domain/notification/notification";

export const fetchNotifications = async (): Promise<Notification[]> => {
  return fetch(`${process.env.SITE_URL}api/notifications`, {
    cache: "no-store",
    method: "GET",
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`${res.status} Failed to fetch Notifications`);
    }

    return res.json();
  });
};
