"use server";

import { createServerValidate } from "@tanstack/react-form/nextjs";

import { subscriptionFormOptions } from "./subscription-form-options";

const serverValidate = createServerValidate({
  ...subscriptionFormOptions,
  onServerValidate: () => {},
});

export async function registerSubscription(prev: unknown, formData: FormData) {
  const result = await serverValidate(formData);
  console.log("prev", prev);
  console.log("Name", result);
}
