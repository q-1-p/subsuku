import "server-only";
import { auth } from "@clerk/nextjs/server";

import type { ICancellationMethod } from "@/domain/cancellation-method/cancellation-method";

export async function fetchCancellationMethod(
  id: string,
): Promise<ICancellationMethod> {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  return fetch(
    `${process.env.SITE_URL}api/cancellation-method?cancellationMethodId=${id}`,
    {
      cache: "no-store",
      headers: {
        Authorization: userId,
      },
      method: "GET",
    },
  ).then((res) => {
    if (!res.ok) {
      throw new Error(`${res.status} Failed to fetch cancellation method`);
    }

    return res.json();
  });
}

export async function searchCancellationMethods(
  searchQuery: string,
  onlyMine: boolean,
  onlyBookmarked: boolean,
): Promise<ICancellationMethod[]> {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  return fetch(
    `${process.env.SITE_URL}api/cancellation-methods?searchQuery=${searchQuery}&onlyMine=${onlyMine}&onlyBookmarked=${onlyBookmarked}`,
    {
      cache: "no-store",
      headers: {
        Authorization: userId,
      },
      method: "GET",
    },
  ).then((res) => {
    if (!res.ok) {
      throw new Error(`${res.status} Failed to fetch cancellation methods`);
    }

    return res.json();
  });
}
