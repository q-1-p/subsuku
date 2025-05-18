"use server";

import { auth } from "@clerk/nextjs/server";

import { getOrigin } from "@/components/url";

export async function updateEmail(
  _: unknown,
  formData: FormData,
): Promise<boolean> {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  return fetch(`${await getOrigin()}/api/user`, {
    method: "PATCH",
    headers: {
      Authorization: userId,
    },
    body: formData,
  }).then((res) => res.ok);
}
