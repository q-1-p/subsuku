"use server";

import { auth } from "@clerk/nextjs/server";

import { getOrigin } from "@/components/url";

export async function registerSubscription(_prev: unknown, formData: FormData) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  return fetch(`${await getOrigin()}/api/subscription`, {
    method: "POST",
    headers: {
      Authorization: userId,
    },
    body: formData,
  }).then((res) => res.ok);
}

export async function updateSubscription(_prev: unknown, formData: FormData) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  return fetch(`${await getOrigin()}/api/subscription`, {
    method: "PUT",
    headers: {
      Authorization: userId,
    },
    body: formData,
  }).then((res) => res.ok);
}

export async function deleteSubscription(_prev: unknown, formData: FormData) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  return fetch(`${await getOrigin()}/api/subscription`, {
    method: "DELETE",
    headers: {
      Authorization: userId,
    },
    body: formData,
  }).then((res) => res.ok);
}
