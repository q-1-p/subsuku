"use server";

import { auth } from "@clerk/nextjs/server";

export async function bookmarkCancellationMethod(formData: FormData) {
  return auth()
    .then((auth) => {
      if (!auth) {
        return false;
      }

      console.dir(formData);

      const res = fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/cancellation-method/bookmark`,
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
      console.error(error);

      return false;
    });
}

export async function goodCancellationMethod(formData: FormData) {
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
      console.error(error);

      return false;
    });
}
