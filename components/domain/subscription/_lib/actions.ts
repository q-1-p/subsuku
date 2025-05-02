"use server";

import { auth } from "@clerk/nextjs/server";

export async function registerSubscription(_prev: unknown, formData: FormData) {
  return auth().then((auth) => {
    if (!auth?.userId) {
      throw new Error("Unauthorized");
    }

    return fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/subscription`, {
      method: "POST",
      headers: {
        Authorization: auth.userId,
      },
      body: formData,
    }).then((res) => res.ok);
  });
}

export async function updateSubscription(_prev: unknown, formData: FormData) {
  return auth().then((auth) => {
    if (!auth?.userId) {
      throw new Error("Unauthorized");
    }

    return fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/subscription`, {
      method: "PUT",
      headers: {
        Authorization: auth.userId,
      },
      body: formData,
    }).then((res) => res.ok);
  });
}

export async function deleteSubscription(formData: FormData) {
  return auth().then((auth) => {
    if (!auth?.userId) {
      throw new Error("Unauthorized");
    }
    return fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/subscription`, {
      method: "DELETE",
      headers: {
        Authorization: auth.userId,
      },
      body: formData,
    }).then((res) => res.ok);
  });
}
