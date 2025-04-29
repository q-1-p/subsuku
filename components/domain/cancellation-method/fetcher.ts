import { auth } from "@clerk/nextjs/server";

import type { ICancellationMethod } from "@/domain/cancellation-method/cancellation-method";

export const fetchCancellationMethod = async (
  id: string,
): Promise<ICancellationMethod> =>
  auth()
    .then((auth) =>
      auth
        ? fetch(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/cancellation-method?cancellationMethodId=${id}`,
            {
              cache: "no-store",
              headers: {
                Authorization: auth.userId ?? "",
              },
              method: "GET",
            },
          ).then((res) => {
            if (!res.ok) {
              throw new Error("Failed to fetch cancellation method");
            }

            return res.json();
          })
        : undefined,
    )
    .catch(() => undefined);
