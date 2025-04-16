import type { ISubscription } from "@/domain/subscription/subscription";
import { currentUser } from "@clerk/nextjs/server";

export const countSubscriptions = (): Promise<number> =>
  currentUser()
    .then((user) =>
      user
        ? fetch(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/subscriptions-count?clerkUserid=${user.id}`,
            {
              cache: "no-store",
              headers: {
                "Content-Type": "application/json; charset=utf-8",
              },
              method: "GET",
            },
          ).then((res) => {
            if (!res.ok) {
              return 0;
            }
            return res.json();
          })
        : 0,
    )
    .catch(() => {
      return 0;
    });

export const fetchMonthlyPrice = (): Promise<number> =>
  currentUser()
    .then((user) =>
      user
        ? fetch(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/subscriptions-monthly-price?clerkUserid=${user.id}`,
            {
              cache: "no-store",
              headers: {
                "Content-Type": "application/json; charset=utf-8",
              },
              method: "GET",
            },
          )
            .then((res) => {
              if (!res.ok) {
                return 0;
              }
              return res.json();
            })
            .catch((error) => {
              console.error("Error fetching :", error);
              return 0;
            })
        : 0,
    )
    .catch(() => {
      return 0;
    });

export const fetchYearlyPrice = (): Promise<number> =>
  currentUser()
    .then((user) =>
      user
        ? fetch(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/subscriptions-count?clerkUserid=${user.id}`,
            {
              cache: "no-store",
              headers: {
                "Content-Type": "application/json; charset=utf-8",
              },
              method: "GET",
            },
          ).then((res) => {
            if (!res.ok) {
              return 0;
            }
            return res.json();
          })
        : 0,
    )
    .catch(() => {
      return 0;
    });

export const fetchSubscriptions = async (
  upcoming: boolean,
): Promise<ISubscription[]> =>
  currentUser()
    .then((user) =>
      user
        ? fetch(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/subscriptions?clerkUserid=${user?.id}&active=true&upcoming=${upcoming}`,
            {
              cache: "no-store",
              headers: {
                "Content-Type": "application/json; charset=utf-8",
              },
              method: "GET",
            },
          )
            .then((res) => {
              if (!res.ok) {
                return [];
              }
              return res.json();
            })
            .then((data) => data as ISubscription[])
            .catch((error) => {
              console.error("Error fetching subscriptions:", error);
              return [];
            })
        : [],
    )
    .catch(() => {
      return [];
    });
