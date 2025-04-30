"use server";

import { auth } from "@clerk/nextjs/server";

export async function registerSubscription(prev: unknown, formData: FormData) {
  const { userId } = await auth();
  return fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/subscription`, {
    method: "POST",
    headers: {
      Authorization: userId ?? "",
    },
    body: formData,
  })
    .then((res) => {
      return res.ok;
    })
    .catch((error) => {
      console.log(prev);
      console.error(error);

      return false;
    });
}

export async function updateSubscription(prev: unknown, formData: FormData) {
  const { userId } = await auth();
  return await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/subscription`, {
    method: "PUT",
    headers: {
      Authorization: userId ?? "",
    },
    body: formData,
  })
    .then((res) => {
      return res.ok;
    })
    .catch((error) => {
      console.log(prev);
      console.error(error);

      return false;
    });
}

export async function deleteSubscription(formData: FormData) {
  const { userId } = await auth();
  return await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/subscription`, {
    method: "DELETE",
    headers: {
      Authorization: userId ?? "",
    },
    body: formData,
  })
    .then((res) => {
      return res.ok;
    })
    .catch(() => {
      return false;
    });
}
