"use server";

import { auth } from "@clerk/nextjs/server";

export async function updateEmail(
  _: unknown,
  formData: FormData,
): Promise<boolean> {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  return fetch(`${process.env.SITE_URL}api/user`, {
    method: "PATCH",
    headers: {
      Authorization: userId,
    },
    body: formData,
  }).then((res) => res.ok);
}

export async function deleteAccount(): Promise<boolean> {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  return fetch(`${process.env.SITE_URL}api/user`, {
    method: "DELETE",
    headers: {
      Authorization: userId,
    },
  }).then((res) => res.ok);
}
