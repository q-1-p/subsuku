"use server";

import { auth } from "@clerk/nextjs/server";

import { getOrigin } from "@/components/url";
import type { ICancellationMethod } from "@/domain/cancellation-method/cancellation-method";
import { searchCancellationMethods as search } from "./fetcher";

export async function searchCancellationMethods(
  _prev: unknown,
  formData: FormData,
): Promise<ICancellationMethod[]> {
  return search(
    formData.get("searchQuery") as string,
    formData.get("onlyMine") === "on",
    formData.get("onlyBookmarked") === "on",
  );
}

export async function linkCancellationMethod(
  _prev: unknown,
  formData: FormData,
): Promise<boolean> {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  return fetch(`${await getOrigin()}/api/subscription/link`, {
    method: "PATCH",
    headers: {
      Authorization: userId,
    },
    body: formData,
  }).then((res) => res.ok);
}

export async function bookmarkCancellationMethod(
  _prev: unknown,
  formData: FormData,
): Promise<boolean> {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  return fetch(`${await getOrigin()}/api/cancellation-method/bookmark`, {
    method: "POST",
    headers: {
      Authorization: userId,
    },
    body: formData,
  }).then((res) => res.ok);
}
export async function releaseBookmarkForCancellationMethod(
  _prev: unknown,
  formData: FormData,
): Promise<boolean> {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  return fetch(`${await getOrigin()}/api/cancellation-method/bookmark`, {
    method: "DELETE",
    headers: {
      Authorization: userId,
    },
    body: formData,
  }).then((res) => res.ok);
}

export async function evaluateGoodToCancellationMethod(
  _prev: unknown,
  formData: FormData,
): Promise<boolean> {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  return fetch(`${await getOrigin()}/api/cancellation-method/good`, {
    method: "POST",
    headers: {
      Authorization: userId,
    },
    body: formData,
  }).then((res) => res.ok);
}
export async function deleteGoodForCancellationMethod(
  _prev: unknown,
  formData: FormData,
): Promise<boolean> {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  return fetch(`${await getOrigin()}/api/cancellation-method/good`, {
    method: "DELETE",
    headers: {
      Authorization: userId,
    },
    body: formData,
  }).then((res) => res.ok);
}
