"use server";

import { auth } from "@clerk/nextjs/server";

export async function goodCancellationMethod(
  prev: unknown,
  formData: FormData,
) {
  return auth()
    .then((auth) => {
      if (!auth) {
        return false;
      }

      const res = fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/cancellation-method/good`,
        {
          method: "POST",
          headers: {
            Authorization: auth.userId ?? "",
          },
          body: formData,
        },
      );

      return res.then((res) => res.ok);
    })
    .catch((error) => {
      console.log(prev);
      console.error(error);

      return false;
    });
}
