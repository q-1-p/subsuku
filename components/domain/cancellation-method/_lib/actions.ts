"use server";

import { auth } from "@clerk/nextjs/server";

export async function linkCancellationMethod(
  formData: FormData,
): Promise<boolean> {
  return auth().then((auth) => {
    if (!auth?.userId) {
      throw new Error("Unauthorized");
    }

    return fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/subscription/link`, {
      method: "PATCH",
      headers: {
        Authorization: auth.userId,
      },
      body: formData,
    }).then((res) => res.ok);
  });
}

export async function bookmarkCancellationMethod(formData: FormData) {
  return auth().then((auth) => {
    if (!auth?.userId) {
      throw new Error("Unauthorized");
    }

    return fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/cancellation-method/bookmark`,
      {
        method: "POST",
        headers: {
          Authorization: auth.userId,
        },
        body: formData,
      },
    ).then((res) => res.ok);
  });
}
export async function releaseBookmarkForCancellationMethod(formData: FormData) {
  return auth().then((auth) => {
    if (!auth?.userId) {
      throw new Error("Unauthorized");
    }

    return fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/cancellation-method/bookmark`,
      {
        method: "DELETE",
        headers: {
          Authorization: auth.userId,
        },
        body: formData,
      },
    );
  });
}

export async function evaluateGoodToCancellationMethod(formData: FormData) {
  return auth().then((auth) => {
    if (!auth?.userId) {
      throw new Error("Unauthorized");
    }

    return fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/cancellation-method/good`,
      {
        method: "POST",
        headers: {
          Authorization: auth.userId,
        },
        body: formData,
      },
    ).then((res) => res.ok);
  });
}
export async function deleteGoodForCancellationMethod(formData: FormData) {
  return auth().then((auth) => {
    if (!auth?.userId) {
      throw new Error("Unauthorized");
    }

    return fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/cancellation-method/good`,
      {
        method: "DELETE",
        headers: {
          Authorization: auth.userId,
        },
        body: formData,
      },
    );
  });
}
