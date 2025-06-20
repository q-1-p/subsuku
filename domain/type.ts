import { type } from "arktype";

import { type Result, err, ok } from "@/lib/result";

//#region Brand
const userIdBrand = Symbol();
const mailAddressBrand = Symbol();
const subscriptionIdBrand = Symbol();
const subscriptionNameBrand = Symbol();
const updateCycleBrand = Symbol();
const cancellationMethodIdBrand = Symbol();
const cancellationMethodUrlBrand = Symbol();
const cancellationMethodPrecautionsBrand = Symbol();
const cancellationMethodFreeTextBrand = Symbol();

const subscriptionBrand = Symbol();
const cancellationMethodBrand = Symbol();
//#endregion

export const userIdSchema = type("string.uuid");
export const mailAddressSchema = type("string.email");

export const currencyIdSchema = type("156 | 392 | 826 | 840 | 978 | 1000"); // バリデーション時に再起エラーになるので直接定義

export const subscriptionIdSchema = type("string.uuid");
export const subscriptionNameSchema = type("0 < string < 32");
export const updateCycleSchema = type({
  number: "number > 0",
  unit: "0 | 1", // バリデーション時に再起エラーになるので直接定義
});
export const cancellationMethodIdSchema = type("string.uuid");
export const cancellationMethodUrlSchema = type("string.url");
export const cancellationMethodStepsSchema = type("string[] > 0");
export const cancellationMethodPrecautionsSchema = type("string");
export const cancellationMethodFreeTextSchema = type("string");

export const cancellationMethodSchema = type({
  id: cancellationMethodIdSchema,
  name: subscriptionNameSchema,
  isPrivate: "boolean",
  urlToCancel: "string.url | '' | null | undefined",
  steps: "string[]",
  precautions: cancellationMethodPrecautionsSchema,
  freeText: cancellationMethodFreeTextSchema,
  updatedAt: "Date",
  linkSubscriptionId: "string.uuid | null | undefined",
});
export const subscriptionSchema = type({
  id: subscriptionIdSchema,
  name: subscriptionNameSchema,
  active: "boolean",
  amount: "number",
  currencyId: currencyIdSchema,
  nextUpdate: "Date",
  updateCycle: updateCycleSchema,
});

export const currencyId = {
  jpy: 392,
  cny: 156,
  gbp: 826,
  usd: 840,
  eur: 978,
  btc: 1000,
} as const;
export const timeUnit = {
  month: 0,
  year: 1,
} as const;

export type CurrencyId = (typeof currencyId)[keyof typeof currencyId];
export type CurrencyCode = keyof typeof currencyId;
export type Currency = {
  id: CurrencyId;
  code: CurrencyCode;
  rate: number;
};
export type TimeUnit = (typeof timeUnit)[keyof typeof timeUnit];

export type SubscriptionOverview = {
  id: string;
  name: string;
  active: boolean;
  fee: number;
  nextUpdate: Date;
  updateUnit: TimeUnit;
};
export type SubscriptionDetail = {
  id: string;
  name: string;
  active: boolean;
  fee: number;
  amount: number;
  currencyId: CurrencyId;
  nextUpdate: Date;
  updateCycle: UpdateCycle;
  linkCancellationMethodId: CancellationMethodId;
};

export type CancellationMethodDetail = {
  id: string;
  subscriptionName: string;
  mine: boolean;
  isPrivate: boolean;
  urlToCancel: string | null | undefined;
  steps: string[];
  precautions: string;
  freeText: string;
  isBookmarked: boolean;
  evaluatedGood: boolean;
  bookmarkCount: number;
  goodCount: number;
  updatedAt: Date;
};

export type UserId = typeof userIdSchema.infer & {
  [userIdBrand]: unknown;
};
export type MailAddress = typeof mailAddressSchema.infer & {
  [mailAddressBrand]: unknown;
};

export type SubscriptionId = typeof subscriptionIdSchema.infer & {
  [subscriptionIdBrand]: unknown;
};
export type SubscriptionName = typeof subscriptionNameSchema.infer & {
  [subscriptionNameBrand]: unknown;
};
// 独自定義型を含めているとschemaが作れないため、直接objectを指定する
export type UpdateCycle = { number: number; unit: TimeUnit } & {
  [updateCycleBrand]: unknown;
};
export type CancellationMethodId = typeof cancellationMethodIdSchema.infer & {
  [cancellationMethodIdBrand]: unknown;
};
export type CancellationMethodUrl = typeof cancellationMethodUrlSchema.infer & {
  [cancellationMethodUrlBrand]: unknown;
};
export type CancellationMethodPrecautions =
  typeof cancellationMethodPrecautionsSchema.infer & {
    [cancellationMethodPrecautionsBrand]: unknown;
  };
export type CancellationMethodFreeText =
  typeof cancellationMethodFreeTextSchema.infer & {
    [cancellationMethodFreeTextBrand]: unknown;
  };

export type Subscription = typeof subscriptionSchema.infer & {
  [subscriptionBrand]: unknown;
};
export type CancellationMethod = typeof cancellationMethodSchema.infer & {
  [cancellationMethodBrand]: unknown;
};

export function validateUserId(value: unknown): Result<UserId, string> {
  const validated = userIdSchema(value);
  if (validated instanceof type.errors) {
    console.error(validated.summary);
    return { type: err, error: validated.summary };
  }
  return { type: ok, value: validated as UserId };
}

export function validateSubscriptionId(
  value: unknown,
): Result<SubscriptionId, string> {
  const validated = subscriptionIdSchema(value);
  if (validated instanceof type.errors) {
    console.error(validated.summary);
    return { type: err, error: validated.summary };
  }
  return { type: ok, value: validated as SubscriptionId };
}
export function validateSubscriptionName(
  value: unknown,
): Result<SubscriptionName, string> {
  const validated = subscriptionNameSchema(value);
  if (validated instanceof type.errors) {
    console.error(validated.summary);
    return { type: err, error: validated.summary };
  }
  return { type: ok, value: validated as SubscriptionName };
}
export function validateCancellationMethodId(
  value: unknown,
): Result<CancellationMethodId, string> {
  const validated = cancellationMethodIdSchema(value);
  if (validated instanceof type.errors) {
    console.error(validated.summary);
    return { type: err, error: validated.summary };
  }
  return { type: ok, value: validated as CancellationMethodId };
}

export function validateSubscription(d: {
  id: string;
  name: string;
  active: boolean;
  amount: number;
  currencyId: number;
  nextUpdate: Date;
  updateCycle: {
    number: number;
    unit: number;
  };
}): Result<Subscription, string> {
  const validated = subscriptionSchema(d);
  if (validated instanceof type.errors) {
    console.error(validated.summary);
    return { type: err, error: validated.summary };
  }
  return { type: ok, value: validated as Subscription };
}
export function validateCancellationMethod(
  d: typeof cancellationMethodSchema.infer,
): Result<CancellationMethod, string> {
  const validated = cancellationMethodSchema(d);
  if (validated instanceof type.errors) {
    console.error(validated.summary);
    return { type: err, error: validated.summary };
  }
  return { type: ok, value: validated as CancellationMethod };
}

export function monthlyCost(subscription: SubscriptionDetail): number {
  switch (subscription.updateCycle.unit) {
    case timeUnit.month:
      return subscription.fee / subscription.updateCycle.number;
    case timeUnit.year:
      return subscription.fee / subscription.updateCycle.number / 12;
    default:
      return subscription.fee;
  }
}
export function yearlyCost(subscription: SubscriptionDetail): number {
  switch (subscription.updateCycle.unit) {
    case timeUnit.month:
      return (subscription.fee / subscription.updateCycle.number) * 12;
    case timeUnit.year:
      return subscription.fee / subscription.updateCycle.number;
    default:
      return subscription.fee;
  }
}
