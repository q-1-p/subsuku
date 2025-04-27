import { auth } from "@clerk/nextjs/server";

import type { ISubscription } from "@/domain/subscription/subscription";

export const fetchSubscription = async (id: string): Promise<ISubscription> =>
  auth()
    .then((auth) =>
      auth
        ? fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/subscription?id=${id}`, {
            cache: "no-store",
            headers: {
              Authorization: auth.userId ?? "",
            },
            method: "GET",
          }).then((res) => res.json())
        : undefined,
    )
    .catch(() => undefined);

export const countSubscriptions = (): Promise<number> =>
  auth()
    .then((auth) =>
      auth
        ? fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/subscriptions/count`, {
            cache: "no-store",
            headers: {
              Authorization: auth.userId ?? "",
            },
            method: "GET",
          }).then((res) => (res.ok ? res.json() : 0))
        : 0,
    )
    .catch(() => 0);

export const fetchMonthlyFee = (): Promise<number> =>
  auth()
    .then((auth) =>
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
          ).then((res) => (res.ok ? res.json() : 0))
        : 0,
    )
    .catch(() => 0);

export const fetchYearlyFee = (): Promise<number> =>
  auth()
    .then((auth) =>
      auth
        ? fetch(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/subscriptions/fee/yearly`,
            {
              cache: "no-store",
              headers: {
                Authorization: auth.userId ?? "",
              },
              method: "GET",
            },
          ).then((res) => (res.ok ? res.json() : 0))
        : 0,
    )
    .catch(() => 0);

export const fetchSubscriptions = async (
  upcoming: boolean,
): Promise<ISubscription[]> =>
  auth()
    .then((auth) =>
      auth
        ? fetch(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/subscriptions?active=true&upcoming=${upcoming}`,
            {
              cache: "no-store",
              headers: {
                Authorization: auth.userId ?? "",
              },
              method: "GET",
            },
          )
            .then((res) => (res.ok ? res.json() : []))
            .then((data) => data as ISubscription[])
        : [],
    )
    .catch(() => []);
