import type { User } from "@clerk/nextjs/server";

export const countSubscriptions = (user: User): Promise<number> =>
  fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/subscriptions-count?clerkUserid=${user.id}`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "GET",
    },
  )
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching count:", error);
      return 0;
    });

export const fetchMonthlyPrice = (user: User): Promise<number> =>
  fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/subscriptions-monthly-price?clerkUserid=${user.id}`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "GET",
    },
  )
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching :", error);
      return 0;
    });

export const fetchYearlyPrice = (user: User): Promise<number> =>
  fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/subscriptions-yearly-price?clerkUserid=${user.id}`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "GET",
    },
  )
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching :", error);
      return 0;
    });
