import "server-only";
import { auth } from "@clerk/nextjs/server";

import type { ISubscription } from "@/domain/subscription/subscription";

export const fetchSubscription = async (id: string): Promise<ISubscription> =>
  auth().then((auth) => {
    if (!auth?.userId) {
      throw new Error("Unauthorized");
    }

    return fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/subscription?id=${id}`,
      {
        cache: "no-store",
        headers: {
          Authorization: auth.userId,
        },
        method: "GET",
      },
    ).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch subscription");
      }

      return res.json();
    });
  });

export const countSubscriptions = (): Promise<number> =>
  auth().then((auth) => {
    if (!auth?.userId) {
      throw new Error("Unauthorized");
    }

    return fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/subscriptions/count`, {
      cache: "no-store",
      headers: {
        Authorization: auth.userId,
      },
      method: "GET",
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch subscriptions count");
      }

      return res.json();
    });
  });

export const fetchMonthlyFee = (): Promise<number> =>
  auth().then((auth) =>
    auth
      ? fetch(
          `${process.env.NEXT_PUBLIC_DOMAIN}/api/subscriptions/fee/monthly`,
          {
            cache: "no-store",
            headers: {
              Authorization: auth.userId ?? "",
            },
            method: "GET",
          },
        ).then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch monthly fee");
          }

          return res.json();
        })
      : 0,
  );

export const fetchYearlyFee = (): Promise<number> =>
  auth().then((auth) => {
    if (!auth?.userId) {
      throw new Error("Unauthorized");
    }

    return fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/subscriptions/fee/yearly`,
      {
        cache: "no-store",
        headers: {
          Authorization: auth.userId,
        },
        method: "GET",
      },
    ).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch yearly fee");
      }

      return res.json();
    });
  });

export const fetchSubscriptions = async (
  upcoming: boolean,
): Promise<ISubscription[]> =>
  auth().then((auth) => {
    if (!auth?.userId) {
      throw new Error("Unauthorized");
    }

    return fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/subscriptions?active=true&upcoming=${upcoming}`,
      {
        cache: "no-store",
        headers: {
          Authorization: auth.userId,
        },
        method: "GET",
      },
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch subscriptions");
        }

        return res.json();
      })
      .then((data) => data as ISubscription[]);
  });
