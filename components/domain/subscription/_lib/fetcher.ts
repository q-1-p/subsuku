import "server-only";
import { auth } from "@clerk/nextjs/server";

import { getOrigin } from "@/components/url";
import type { ISubscription } from "@/domain/subscription/subscription";

export const fetchSubscription = async (id: string): Promise<ISubscription> =>
  auth().then(async (auth) => {
    if (!auth?.userId) {
      throw new Error("Unauthorized");
    }

    return fetch(`${await getOrigin()}/api/subscription?id=${id}`, {
      cache: "no-store",
      headers: {
        Authorization: auth.userId,
      },
      method: "GET",
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} Failed to fetch subscription`);
      }

      return res.json();
    });
  });

export const countSubscriptions = (): Promise<number> =>
  auth().then(async (auth) => {
    if (!auth?.userId) {
      throw new Error("Unauthorized");
    }

    return fetch(`${await getOrigin()}/api/subscriptions/count`, {
      cache: "no-store",
      headers: {
        Authorization: auth.userId,
      },
      method: "GET",
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} Failed to fetch subscriptions count`);
      }

      return res.json();
    });
  });

export const fetchMonthlyFee = (): Promise<number> =>
  auth().then(async (auth) =>
    auth
      ? fetch(`${await getOrigin()}/api/subscriptions/fee/monthly`, {
          cache: "no-store",
          headers: {
            Authorization: auth.userId ?? "",
          },
          method: "GET",
        }).then((res) => {
          if (!res.ok) {
            throw new Error(`${res.status} Failed to fetch monthly fee`);
          }

          return res.json();
        })
      : 0,
  );

export const fetchYearlyFee = (): Promise<number> =>
  auth().then(async (auth) => {
    if (!auth?.userId) {
      throw new Error("Unauthorized");
    }

    return fetch(`${await getOrigin()}/api/subscriptions/fee/yearly`, {
      cache: "no-store",
      headers: {
        Authorization: auth.userId,
      },
      method: "GET",
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} Failed to fetch yearly fee`);
      }

      return res.json();
    });
  });

export const fetchSubscriptions = async (
  upcoming: boolean,
): Promise<ISubscription[]> =>
  auth().then(async (auth) => {
    if (!auth?.userId) {
      throw new Error("Unauthorized");
    }

    return fetch(
      `${await getOrigin()}/api/subscriptions?active=true&upcoming=${upcoming}`,
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
          throw new Error(`${res.status} Failed to fetch subscriptions`);
        }

        return res.json();
      })
      .then((data) => data as ISubscription[]);
  });
