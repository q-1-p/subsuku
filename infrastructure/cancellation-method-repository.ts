import { db } from "@/db";
import type { ICancellationMethod } from "@/domain/cancellation-method/cancellation-method";
import { CancellationMethodId } from "@/domain/cancellation-method/cancellation-method-id";
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

        const cancellationStepsResult = await this.findManyAllCancellationSteps(
          datum.id,
        );
        const cancellationMethodIdResult = CancellationMethodId.factory(
          datum.id,
        );
        if (cancellationMethodIdResult.type === err) {
          throw new Error("Not found");
        }

        const isBookmarkedResult = await this.isBookmarked(
          userId,
          cancellationMethodIdResult.value,
        );
        const ratedGoodResult = await this.ratedGood(
          userId,
          cancellationMethodIdResult.value,
        );
        const bookmarkCountResult = await this.countBookmarks(
          cancellationMethodIdResult.value,
        );
        const goodCountResult = await this.countGoods(
          cancellationMethodIdResult.value,
        );

        if (
          isBookmarkedResult.type === err ||
          ratedGoodResult.type === err ||
          cancellationStepsResult.type === err ||
          bookmarkCountResult.type === err ||
          goodCountResult.type === err
        ) {
          throw new Error("Count failed");
        }

        return {
          type: ok as typeof ok,
          value: {
            id: datum.id,
            subscriptionName: datum.name,
            public: datum.public,
            steps: cancellationStepsResult.value,
            precautions: datum.precautions,
            freeText: datum.freeText,
            isBookmarked: isBookmarkedResult.value,
            ratedGood: ratedGoodResult.value,
            bookmarkCount: bookmarkCountResult.value,
            goodCount: goodCountResult.value,
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
          data.map(async (datum) => {
            if (!datum) {
              throw new Error("Not found");
            }

            const cancellationStepsResult =
              await this.findManyAllCancellationSteps(datum.id);
            const cancellationMethodIdResult = CancellationMethodId.factory(
              datum.id,
            );
            if (cancellationMethodIdResult.type === err) {
              throw new Error("Not found");
            }

            const isBookmarkedResult = await this.isBookmarked(
              userId,
              cancellationMethodIdResult.value,
            );
            const ratedGoodResult = await this.ratedGood(
              userId,
              cancellationMethodIdResult.value,
            );
            const bookmarkCountResult = await this.countBookmarks(
              cancellationMethodIdResult.value,
            );
            const goodCountResult = await this.countGoods(
              cancellationMethodIdResult.value,
            );

            if (
              isBookmarkedResult.type === err ||
              ratedGoodResult.type === err ||
              cancellationStepsResult.type === err ||
              bookmarkCountResult.type === err ||
              goodCountResult.type === err
            ) {
              throw new Error("Count failed");
            }

            return {
              id: datum.id,
              subscriptionName: datum.name,
              public: datum.public,
              steps: cancellationStepsResult.value,
              precautions: datum.precautions,
              freeText: datum.freeText,
              isBookmarked: isBookmarkedResult.value,
              ratedGood: ratedGoodResult.value,
              bookmarkCount: bookmarkCountResult.value,
              goodCount: goodCountResult.value,
              serviceUrl: datum.serviceUrl,
              mine: datum.createdUserId === userId.value,
              updatedAt: new Date(datum.updatedAt),
            } as ICancellationMethod;
          }),
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

  public isBookmarked = (
    userId: UserId,
    cancellationMethodId: CancellationMethodId,
  ): Promise<Result<boolean, undefined>> => {
    return db.query.cancellationMethodBookmarksTable
      .findFirst({
        where: (cancellationMethodBookmarks, { and, eq }) =>
          and(
            eq(
              cancellationMethodBookmarks.cancellationMethodId,
              cancellationMethodId.value,
            ),
            eq(cancellationMethodBookmarks.userId, userId.value),
          ),
      })
      .then((datum) => ({ type: ok as typeof ok, value: !!datum }))
      .catch((error) => {
        console.error(error);
        return { type: err as typeof err, error: undefined };
      });
  };
  public ratedGood = (
    userId: UserId,
    cancellationMethodId: CancellationMethodId,
  ): Promise<Result<boolean, undefined>> => {
    return db.query.cancellationMethodGoodsTable
      .findFirst({
        where: (cancellationMethodGoods, { and, eq }) =>
          and(
            eq(
              cancellationMethodGoods.cancellationMethodId,
              cancellationMethodId.value,
            ),
            eq(cancellationMethodGoods.userId, userId.value),
          ),
      })
      .then((datum) => ({ type: ok as typeof ok, value: !!datum }))
      .catch((error) => {
        console.error(error);
        return { type: err as typeof err, error: undefined };
      });
  };

  public countBookmarks = (
    cancellationMethodId: CancellationMethodId,
  ): Promise<Result<number, undefined>> => {
    return db.query.cancellationMethodBookmarksTable
      .findMany({
        where: (cancellationMethodBookmarks, { eq }) =>
          eq(
            cancellationMethodBookmarks.cancellationMethodId,
            cancellationMethodId.value,
          ),
      })
      .then((data) => ({ type: ok as typeof ok, value: data.length }))
      .catch((error) => {
        console.error(error);
        return { type: err as typeof err, error: undefined };
      });
  };
  public countGoods = (
    cancellationMethodId: CancellationMethodId,
  ): Promise<Result<number, undefined>> => {
    return db.query.cancellationMethodGoodsTable
      .findMany({
        where: (cancellationMethodGoods, { eq }) =>
          eq(
            cancellationMethodGoods.cancellationMethodId,
            cancellationMethodId.value,
          ),
      })
      .then((data) => ({ type: ok as typeof ok, value: data.length }))
      .catch((error) => {
        console.error(error);
        return { type: err as typeof err, error: undefined };
      });
  };

  private findManyAllCancellationSteps = (
    cancellationMethodId: string,
  ): Promise<Result<string[], undefined>> => {
    return db.query.cancellationStepsTable
      .findMany({
        where: (cancellationMethods, { eq }) =>
          eq(cancellationMethods.cancellationMethodId, cancellationMethodId),
      })
      .then((data) => ({
        type: ok as typeof ok,
        value: data
          .sort((x) => x.sequentialOrder)
          .map((step) => step.procedure),
      }))
      .catch((error) => {
        console.error(error);
        return { type: err as typeof err, error: undefined };
      });
  };
}
