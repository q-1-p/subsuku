import "server-only";
import { auth } from "@clerk/nextjs/server";

import type { ISubscription } from "@/domain/subscription/subscription";

export async function fetchSubscription(id: string): Promise<ISubscription> {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  return fetch(`${process.env.SITE_URL}api/subscription?id=${id}`, {
    cache: "no-store",
    headers: {
      Authorization: userId,
    },
    method: "GET",
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`${res.status} Failed to fetch subscription`);
    }

    return res.json();
  });
}
export async function fetchSubscriptionSuggestions(): Promise<string[]> {
  // 入力候補の追加のためだけにコミットログを増やす事態を避けたいので、Github Gistから取得する
  // https://gist.github.com/q-1-p/f57f88695749f919aa60250010b68976 から取得
  return fetch(
    "https://gist.githubusercontent.com/q-1-p/f57f88695749f919aa60250010b68976/raw/substrack.json",
    {
      cache: "no-store",
      method: "GET",
    },
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(
          `${res.status} Failed to fetch subscription suggestions`,
        );
      }

      return res.json();
    })
    .then((data) => data.subscriptionNameSuggestions);
}

export async function countSubscriptions(): Promise<number> {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  return fetch(`${process.env.SITE_URL}api/subscriptions/count`, {
    cache: "no-store",
    headers: {
      Authorization: userId,
    },
    method: "GET",
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`${res.status} Failed to fetch subscriptions count`);
    }

    return res.json();
  });
}

export async function fetchMonthlyFee(): Promise<number> {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  return fetch(`${process.env.SITE_URL}api/subscriptions/fee/monthly`, {
    cache: "no-store",
    headers: {
      Authorization: userId,
    },
    method: "GET",
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`${res.status} Failed to fetch monthly fee`);
    }

    return res.json();
  });
}

export async function fetchYearlyFee(): Promise<number> {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  return fetch(`${process.env.SITE_URL}api/subscriptions/fee/yearly`, {
    cache: "no-store",
    headers: {
      Authorization: userId,
    },
    method: "GET",
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`${res.status} Failed to fetch yearly fee`);
    }

    return res.json();
  });
}

export const fetchSubscriptions = async (
  upcoming = false,
): Promise<ISubscription[]> => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  return fetch(
    `${process.env.SITE_URL}api/subscriptions?active=true&upcoming=${upcoming}`,
    {
      cache: "no-store",
      headers: {
        Authorization: userId,
      },
      method: "GET",
    },
  ).then((res) => {
    if (!res.ok) {
      throw new Error(`${res.status} Failed to fetch subscriptions`);
    }

    return res.json();
  });
};
