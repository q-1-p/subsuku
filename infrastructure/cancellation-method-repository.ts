import { db } from "@/db";
import type { ICancellationMethod } from "@/domain/cancellation-method/cancellation-method";
import type { CancellationMethodId } from "@/domain/cancellation-method/cancellation-method-id";
import type { ICancellationMethodRepository } from "@/domain/cancellation-method/cancellation-method-repository";
import { type Result, err, ok } from "@/lib/result";

export class CancellationMethodRepository
  implements ICancellationMethodRepository
{
  public find = async (
    cancellationMethodId: CancellationMethodId,
  ): Promise<Result<ICancellationMethod, undefined>> => {
    return db.query.cancellationMethodsTable
      .findFirst({
        where: (cancellationMethods, { eq }) =>
          eq(cancellationMethods.id, cancellationMethodId.value),
      })
      .then(async (datum) => {
        if (!datum) {
          throw new Error("Not found");
        }
        const cancellationSteps =
          await this.findManyAllCancellationSteps(cancellationMethodId);

        return {
          type: ok as typeof ok,
          value: {
            id: datum.id,
            subscriptionName: datum.name,
            public: datum.public,
            steps: cancellationSteps,
            precautions: datum.precautions,
            freeText: datum.freeText,
            serviceUrl: datum.serviceUrl,
            createdUserId: datum.createdUserId,
            updatedAt: new Date(datum.updatedAt),
          } as ICancellationMethod,
        };
      })
      .catch((error) => {
        console.error(error);
        return { type: err as typeof err, error: undefined };
      });
  };

  private findManyAllCancellationSteps = (
    cancellationMethodId: CancellationMethodId,
  ): Promise<string[]> => {
    return db.query.cancellationStepsTable
      .findMany({
        where: (cancellationMethods, { eq }) =>
          eq(
            cancellationMethods.cancellationMethodId,
            cancellationMethodId.value,
          ),
      })
      .then((datum) =>
        datum.sort((x) => x.sequentialOrder).map((step) => step.procedure),
      )
      .catch((error) => {
        console.error(error);
        return [];
      });
  };
}
