import { auth } from "@clerk/nextjs/server";

import type { ISubscription } from "@/domain/subscription/subscription";

export const countSubscriptions = (): Promise<number> =>
  auth()
    .then((auth) =>
      auth
        ? fetch(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/subscriptions-count?clerkUserid=${auth.userId}`,
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
  auth()
    .then((auth) =>
      auth
        ? fetch(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/subscriptions-monthly-price?clerkUserid=${auth.userId}`,
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
  auth()
    .then((auth) =>
      auth
        ? fetch(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/subscriptions-count?clerkUserid=${auth.userId}`,
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
  auth()
    .then((auth) =>
      auth
        ? fetch(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/subscriptions?clerkUserid=${auth?.userId}&active=true&upcoming=${upcoming}`,
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
