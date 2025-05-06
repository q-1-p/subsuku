import { v4 } from "uuid";

import { type Result, err, ok } from "@/lib/result";
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
  public readonly linkSubscriptionId: string;
  public readonly createdUserId: UserId;

  private constructor(
    id: CancellationMethodId,
    name: string,
    siteUrl: string,
    isPrivate: boolean,
    steps: string[],
    precautions: string,
    freeText: string,
    linkSubscriptionId: string,
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

  public static factory(
    name: string,
    siteUrl: string,
    isPrivate: boolean,
    steps: string[],
    precautions: string,
    freeText: string,
    linkSubscriptionId: string,
    createdUserId: UserId,
  ): Result<CancellationMethodRegistered, string> {
    const idResult = CancellationMethodId.factory(v4());

    if (idResult.type === err) {
      return { type: err, error: "登録しようとした値が不正です" };
    }
    return {
      type: ok,
      value: new CancellationMethodRegistered(
        idResult.value,
        name,
        siteUrl,
        isPrivate,
        steps,
        precautions,
        freeText,
        linkSubscriptionId,
        createdUserId,
      ),
    };
  }
}
