"use server";

import { auth } from "@clerk/nextjs/server";

import { searchCancellationMethods as search } from "./fetcher";

import type { CancellationMethodDetail } from "@/domain/type";

export async function searchCancellationMethods(
  _prev: unknown,
  formData: FormData,
): Promise<CancellationMethodDetail[]> {
  return search(
    formData.get("searchQuery") as string,
    formData.get("onlyMine") === "on",
    formData.get("onlyBookmarked") === "on",
  );
}

export async function registerCancellationMethod(
  _prev: unknown,
  formData: FormData,
): Promise<boolean> {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  return fetch(`${process.env.SITE_URL}api/cancellation-method`, {
    method: "POST",
    headers: {
      Authorization: userId,
    },
    body: formData,
  }).then((res) => res.ok);
}
export async function linkCancellationMethod(
  _prev: unknown,
  formData: FormData,
): Promise<boolean> {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  return fetch(`${process.env.SITE_URL}api/subscription/link`, {
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

  return fetch(`${process.env.SITE_URL}api/cancellation-method/bookmark`, {
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

  return fetch(`${process.env.SITE_URL}api/cancellation-method/bookmark`, {
    method: "DELETE",
    headers: {
      Authorization: userId,
    },
    body: formData,
  }).then((res) => res.ok);
}

export async function updateCancellationMethod(
  _prev: unknown,
  formData: FormData,
): Promise<boolean> {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  return fetch(`${process.env.SITE_URL}api/cancellation-method`, {
    method: "PUT",
    headers: {
      Authorization: userId,
    },
    body: formData,
  }).then((res) => res.ok);
}

export async function deleteCancellationMethod(
  _prev: unknown,
  formData: FormData,
): Promise<boolean> {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  return fetch(`${process.env.SITE_URL}api/cancellation-method`, {
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

  return fetch(`${process.env.SITE_URL}api/cancellation-method/good`, {
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

  return fetch(`${process.env.SITE_URL}api/cancellation-method/good`, {
    method: "DELETE",
    headers: {
      Authorization: userId,
    },
    body: formData,
  }).then((res) => res.ok);
}
