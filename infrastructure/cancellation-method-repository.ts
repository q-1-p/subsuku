import { db } from "@/db";
import type { ICancellationMethod } from "@/domain/cancellation-method/cancellation-method";
import type { CancellationMethodId } from "@/domain/cancellation-method/cancellation-method-id";
import type { ICancellationMethodRepository } from "@/domain/cancellation-method/cancellation-method-repository";
import type { UserId } from "@/domain/user/user-id";
import { type Result, err, ok } from "@/lib/result";

export class CancellationMethodRepository
  implements ICancellationMethodRepository
{
  public find = async (
    userId: UserId,
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
        const cancellationSteps = await this.findManyAllCancellationSteps(
          cancellationMethodId.value,
        );

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
            mine: datum.createdUserId === userId.value,
            updatedAt: new Date(datum.updatedAt),
          } as ICancellationMethod,
        };
      })
      .catch((error) => {
        console.error(error);
        return { type: err as typeof err, error: undefined };
      });
  };

  public findAll = (
    userId: UserId,
  ): Promise<Result<ICancellationMethod[], undefined>> => {
    return db.query.cancellationMethodsTable
      .findMany()
      .then(async (data) => {
        const cancellationMethods = await Promise.all(
          data.map(
            async (datum) =>
              ({
                id: datum.id,
                subscriptionName: datum.name,
                public: datum.public,
                steps: await this.findManyAllCancellationSteps(datum.id),
                precautions: datum.precautions,
                freeText: datum.freeText,
                serviceUrl: datum.serviceUrl,
                mine: datum.createdUserId === userId.value,
                updatedAt: new Date(datum.updatedAt),
              }) as ICancellationMethod,
          ),
        );

        return {
          type: ok as typeof ok,
          value: cancellationMethods,
        };
      })
      .catch((error) => {
        console.error(error);
        return { type: err as typeof err, error: undefined };
      });
  };

  private findManyAllCancellationSteps = (
    cancellationMethodId: string,
  ): Promise<string[]> => {
    return db.query.cancellationStepsTable
      .findMany({
        where: (cancellationMethods, { eq }) =>
          eq(cancellationMethods.cancellationMethodId, cancellationMethodId),
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
