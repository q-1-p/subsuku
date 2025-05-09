import { type Result, err, ok } from "@/lib/result";
import { type } from "arktype";
import { CancellationMethodId } from "./cancellation-method-id";

const cancellationMethodUpdatedScheme = type({
  id: "string.uuid",
  name: "string",
  siteUrl: "string.url | string == 0",
  isPrivate: "boolean",
  steps: "string[] > 0",
  precautions: "string",
  freeText: "string",
});

export class CancellationMethodUpdated {
  public readonly id: CancellationMethodId;
  public readonly name: string;
  public readonly serviceUrl: string;
  public readonly private: boolean;
  public readonly steps: string[];
  public readonly precautions: string;
  public readonly freeText: string;

  private constructor(
    id: CancellationMethodId,
    name: string,
    siteUrl: string,
    isPrivate: boolean,
    steps: string[],
    precautions: string,
    freeText: string,
  ) {
    this.id = id;
    this.name = name;
    this.serviceUrl = siteUrl;
    this.private = isPrivate;
    this.steps = steps;
    this.precautions = precautions;
    this.freeText = freeText;
  }

  public static factory(
    d: typeof cancellationMethodUpdatedScheme.infer,
  ): Result<CancellationMethodUpdated, undefined> {
    const idResult = CancellationMethodId.factory(d.id);
    if (idResult.type === err) {
      return { type: err, error: undefined };
    }

    const validated = cancellationMethodUpdatedScheme(d);
    if (validated instanceof type.errors) {
      console.error(validated.summary);
      return { type: err, error: undefined };
    }

    return {
      type: ok,
      value: new CancellationMethodUpdated(
        idResult.value,
        d.name,
        d.siteUrl,
        d.isPrivate,
        d.steps,
        d.precautions,
        d.freeText,
      ),
    };
  }
}
