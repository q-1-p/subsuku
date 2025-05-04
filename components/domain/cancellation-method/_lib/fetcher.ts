import "server-only";
import { auth } from "@clerk/nextjs/server";

import { getOrigin } from "@/components/url";
import type { ICancellationMethod } from "@/domain/cancellation-method/cancellation-method";

export function fetchCancellationMethod(
  id: string,
): Promise<ICancellationMethod> {
  return auth().then(async (auth) => {
    if (!auth?.userId) {
      throw new Error("Unauthorized");
    }

    return fetch(
      `${await getOrigin()}/api/cancellation-method?cancellationMethodId=${id}`,
      {
        cache: "no-store",
        headers: {
          Authorization: auth.userId,
        },
        method: "GET",
      },
    ).then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} Failed to fetch cancellation method`);
      }

      return res.json();
    });
  });
}

export function fetchCancellationMethods(): Promise<ICancellationMethod[]> {
  return auth().then(async (auth) => {
    if (!auth?.userId) {
      throw new Error("Unauthorized");
    }

    return fetch(`${await getOrigin()}/api/cancellation-methods`, {
      cache: "no-store",
      headers: {
        Authorization: auth.userId,
      },
      method: "GET",
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} Failed to fetch cancellation methods`);
      }

      return res.json();
    });
  });
}
