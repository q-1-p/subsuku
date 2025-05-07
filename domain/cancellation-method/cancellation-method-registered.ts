import { v4 } from "uuid";

import { type Result, err, ok } from "@/lib/result";
import { type } from "arktype";
import { SubscriptionId } from "../subscription/subscription-id";
import type { UserId } from "../user/user-id";
import { CancellationMethodId } from "./cancellation-method-id";

export class CancellationMethodRegistered {
  public readonly id: CancellationMethodId;
  public readonly name: string;
  public readonly serviceUrl: string;
  public readonly private: boolean;
  public readonly steps: string[];
  public readonly precautions: string;
  public readonly freeText: string;
  public readonly linkSubscriptionId: SubscriptionId | undefined;
  public readonly createdUserId: UserId;

  private constructor(
    id: CancellationMethodId,
    name: string,
    siteUrl: string,
    isPrivate: boolean,
    steps: string[],
    precautions: string,
    freeText: string,
    linkSubscriptionId: SubscriptionId | undefined,
    createdUserId: UserId,
  ) {
    this.id = id;
    this.name = name;
    this.serviceUrl = siteUrl;
    this.private = isPrivate;
    this.steps = steps;
    this.precautions = precautions;
    this.freeText = freeText;
    this.linkSubscriptionId = linkSubscriptionId;
    this.createdUserId = createdUserId;
  }

  public static factory(d: {
    name: string;
    siteUrl: string;
    isPrivate: boolean;
    steps: string[];
    precautions: string;
    freeText: string;
    linkSubscriptionId: string;
    createdUserId: UserId;
  }): Result<CancellationMethodRegistered, undefined> {
    const idResult = CancellationMethodId.factory(v4());
    if (idResult.type === err) {
      return { type: err, error: undefined };
    }

    console.dir(d);

    const validated = type({
      name: "string",
      siteUrl: "string.url | string == 0",
      isPrivate: "boolean",
      steps: "string[] > 0",
      precautions: "string",
      freeText: "string",
      linkSubscriptionId: "string.uuid | undefined | null",
      createdUserId: { value: "string.uuid" },
    })(d);
    if (validated instanceof type.errors) {
      console.error(validated.summary);
      return { type: err, error: undefined };
    }

    if (d.linkSubscriptionId) {
      const linkSubscriptionIdResult = SubscriptionId.factory(
        d.linkSubscriptionId,
      );

      if (linkSubscriptionIdResult.type === err) {
        return { type: err, error: undefined };
      }

      return {
        type: ok,
        value: new CancellationMethodRegistered(
          idResult.value,
          d.name,
          d.siteUrl,
          d.isPrivate,
          d.steps,
          d.precautions,
          d.freeText,
          linkSubscriptionIdResult.value,
          d.createdUserId,
        ),
      };
    }

    return {
      type: ok,
      value: new CancellationMethodRegistered(
        idResult.value,
        d.name,
        d.siteUrl,
        d.isPrivate,
        d.steps,
        d.precautions,
        d.freeText,
        undefined,
        d.createdUserId,
      ),
    };
  }
}
