import "server-only";
import { auth } from "@clerk/nextjs/server";

import type { ICancellationMethod } from "@/domain/cancellation-method/cancellation-method";

export function fetchCancellationMethod(
  id: string,
): Promise<ICancellationMethod> {
  return auth().then((auth) => {
    if (!auth?.userId) {
      throw new Error("Unauthorized");
    }

    return fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/cancellation-method?cancellationMethodId=${id}`,
      {
        cache: "no-store",
        headers: {
          Authorization: auth.userId,
        },
        method: "GET",
      },
    ).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch cancellation method");
      }

      return res.json();
    });
  });
}

export function fetchCancellationMethods(): Promise<ICancellationMethod[]> {
  return auth().then((auth) => {
    if (!auth?.userId) {
      throw new Error("Unauthorized");
    }

    return fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/cancellation-methods`, {
      cache: "no-store",
      headers: {
        Authorization: auth.userId,
      },
      method: "GET",
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch cancellation methods");
      }

      return res.json();
    });
  });
}
