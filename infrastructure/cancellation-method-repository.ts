import { and, eq, inArray, like, sql } from "drizzle-orm";

import { db, dbSocket } from "@/db";
import {
  cancellationMethodBookmarksTable,
  cancellationMethodGoodsTable,
  cancellationMethodsTable,
  cancellationStepsTable,
  subscriptionsTable,
} from "@/db/schema";
import type { ICancellationMethodRepository } from "@/domain/cancellation-method/cancellation-method-repository";
import type {
  CancellationMethod,
  CancellationMethodDetail,
  CancellationMethodId,
  UserId,
} from "@/domain/type";
import { type Result, err, ok } from "@/lib/result";

const searchNameQuery = db
  .select()
  .from(cancellationMethodsTable)
  .where(like(cancellationMethodsTable.name, sql.placeholder("name")))
  .prepare("searchName");

const bookmarksQuery = db
  .select({
    cancellationMethodId: cancellationMethodBookmarksTable.cancellationMethodId,
  })
  .from(cancellationMethodBookmarksTable)
  .where(eq(cancellationMethodBookmarksTable.userId, sql.placeholder("userId")))
  .prepare("bookmarks");

export class CancellationMethodRepository
  implements ICancellationMethodRepository
{
  public find = async (
    userId: UserId,
    cancellationMethodId: CancellationMethodId,
  ): Promise<Result<CancellationMethodDetail, undefined>> => {
    return db.query.cancellationMethodsTable
      .findFirst({
        where: (cancellationMethods, { eq }) =>
          eq(cancellationMethods.id, cancellationMethodId),
      })
      .then(async (datum) => {
        if (!datum) {
          throw new Error("Not found");
        }

        const cancellationStepsResult = await this.findManyAllCancellationSteps(
          cancellationMethodId as CancellationMethodId,
        );
        const isBookmarkedResult = await this.isBookmarked(
          userId,
          cancellationMethodId,
        );
        const evaluatedGoodResult = await this.evaluatedGood(
          userId,
          cancellationMethodId,
        );
        const bookmarkCountResult =
          await this.countBookmarks(cancellationMethodId);
        const goodCountResult = await this.countGoods(cancellationMethodId);

        if (
          isBookmarkedResult.type === err ||
          evaluatedGoodResult.type === err ||
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
            isPrivate: datum.private,
            steps: cancellationStepsResult.value,
            precautions: datum.precautions,
            freeText: datum.freeText,
            isBookmarked: isBookmarkedResult.value,
            evaluatedGood: evaluatedGoodResult.value,
            bookmarkCount: bookmarkCountResult.value,
            goodCount: goodCountResult.value,
            urlToCancel: datum.urlToCancel,
            mine: datum.createdUserId === userId,
            updatedAt: new Date(datum.updatedAt),
          } as CancellationMethodDetail,
        };
      })
      .catch((error) => {
        console.error(error);
        return { type: err as typeof err, error: undefined };
      });
  };

  public searchForName = async (
    searchQuery: string,
  ): Promise<Result<CancellationMethodDetail[], undefined>> => {
    return searchNameQuery
      .execute({ name: `%${searchQuery}%` })
      .then(async (data) => {
        const cancellationMethods = await Promise.all(
          data.map(async (datum) => {
            const bookmarkCountResult = await this.countBookmarks(
              datum.id as CancellationMethodId,
            );
            const goodCountResult = await this.countGoods(
              datum.id as CancellationMethodId,
            );

            if (
              bookmarkCountResult.type === err ||
              goodCountResult.type === err
            ) {
              throw new Error("Count failed");
            }

            return {
              id: datum.id,
              subscriptionName: datum.name,
              isPrivate: datum.private,
              steps: [],
              precautions: datum.precautions,
              freeText: datum.freeText,
              isBookmarked: false,
              evaluatedGood: false,
              bookmarkCount: bookmarkCountResult.value,
              goodCount: goodCountResult.value,
              urlToCancel: datum.urlToCancel,
              mine: false,
              updatedAt: new Date(datum.updatedAt),
            } as CancellationMethodDetail;
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

  public search = async (
    userId: UserId,
    searchQuery: string,
    onlyMine: boolean,
    onlyBookmarked: boolean,
  ): Promise<Result<CancellationMethodDetail[], undefined>> => {
    const bookmarkedIds = await bookmarksQuery
      .execute({ userId: userId })
      .then((res) => res.map((b) => b.cancellationMethodId));

    return db.query.cancellationMethodsTable
      .findMany({
        where: (cancellationMethodsTable, { and, eq, like }) =>
          and(
            like(cancellationMethodsTable.name, `%${searchQuery}%`),
            onlyMine
              ? eq(cancellationMethodsTable.createdUserId, userId)
              : undefined,
            onlyBookmarked
              ? inArray(cancellationMethodsTable.id, bookmarkedIds)
              : undefined,
          ),
      })
      .then(async (data) => {
        const cancellationMethods = await Promise.all(
          data.map(async (datum) => {
            if (!datum) {
              throw new Error("Not found");
            }

            const cancellationStepsResult =
              await this.findManyAllCancellationSteps(
                datum.id as CancellationMethodId,
              );
            const isBookmarkedResult = await this.isBookmarked(
              userId,
              datum.id as CancellationMethodId,
            );
            const evaluatedGoodResult = await this.evaluatedGood(
              userId,
              datum.id as CancellationMethodId,
            );
            const bookmarkCountResult = await this.countBookmarks(
              datum.id as CancellationMethodId,
            );
            const goodCountResult = await this.countGoods(
              datum.id as CancellationMethodId,
            );

            if (
              isBookmarkedResult.type === err ||
              evaluatedGoodResult.type === err ||
              cancellationStepsResult.type === err ||
              bookmarkCountResult.type === err ||
              goodCountResult.type === err
            ) {
              throw new Error("Count failed");
            }

            return {
              id: datum.id,
              subscriptionName: datum.name,
              isPrivate: datum.private,
              steps: cancellationStepsResult.value,
              precautions: datum.precautions,
              freeText: datum.freeText,
              isBookmarked: isBookmarkedResult.value,
              evaluatedGood: evaluatedGoodResult.value,
              bookmarkCount: bookmarkCountResult.value,
              goodCount: goodCountResult.value,
              urlToCancel: datum.urlToCancel,
              mine: datum.createdUserId === userId,
              updatedAt: new Date(datum.updatedAt),
            } as CancellationMethodDetail;
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
              cancellationMethodId,
            ),
            eq(cancellationMethodBookmarks.userId, userId),
          ),
      })
      .then((datum) => ({ type: ok as typeof ok, value: !!datum }))
      .catch((error) => {
        console.error(error);
        return { type: err as typeof err, error: undefined };
      });
  };
  public evaluatedGood = (
    userId: UserId,
    cancellationMethodId: CancellationMethodId,
  ): Promise<Result<boolean, undefined>> => {
    return db.query.cancellationMethodGoodsTable
      .findFirst({
        where: (cancellationMethodGoods, { and, eq }) =>
          and(
            eq(
              cancellationMethodGoods.cancellationMethodId,
              cancellationMethodId,
            ),
            eq(cancellationMethodGoods.userId, userId),
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
            cancellationMethodId,
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
            cancellationMethodId,
          ),
      })
      .then((data) => ({ type: ok as typeof ok, value: data.length }))
      .catch((error) => {
        console.error(error);
        return { type: err as typeof err, error: undefined };
      });
  };

  public add = (
    userId: UserId,
    cancellationMethod: CancellationMethod,
  ): Promise<boolean> => {
    return dbSocket
      .transaction((tx) => {
        const results = [
          tx
            .insert(cancellationMethodsTable)
            .values({
              id: cancellationMethod.id,
              name: cancellationMethod.name,
              urlToCancel: cancellationMethod.urlToCancel ?? "",
              private: cancellationMethod.isPrivate,
              precautions: cancellationMethod.precautions,
              freeText: cancellationMethod.freeText,
              createdUserId: userId,
            })
            .then(() => true)
            .catch((error) => {
              console.error(error);
              throw error;
            }),
          tx
            .insert(cancellationStepsTable)
            .values(
              cancellationMethod.steps.map((step, index) => ({
                cancellationMethodId: cancellationMethod.id,
                sequentialOrder: index,
                procedure: step,
              })),
            )
            .then(() => true)
            .catch((error) => {
              console.error(error);
              throw error;
            }),
          cancellationMethod.linkSubscriptionId
            ? tx
                .update(subscriptionsTable)
                .set({
                  cancellationMethodId: cancellationMethod.id,
                })
                .where(
                  and(
                    eq(subscriptionsTable.userId, userId),
                    eq(
                      subscriptionsTable.id,
                      cancellationMethod.linkSubscriptionId,
                    ),
                  ),
                )
                .then(() => true)
                .catch((error) => {
                  console.error(error);
                  throw error;
                })
            : Promise.resolve(true),
        ];

        return Promise.all(results).then((results) =>
          results.every((result) => result === true),
        );
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
  };

  public addBookmark = (
    userId: UserId,
    cancellationMethodId: CancellationMethodId,
  ): Promise<boolean> => {
    return db
      .insert(cancellationMethodBookmarksTable)
      .values({
        userId: userId,
        cancellationMethodId: cancellationMethodId,
      })
      .then(() => true)
      .catch((error) => {
        console.error(error);
        return false;
      });
  };
  public addGood = (
    userId: UserId,
    cancellationMethodId: CancellationMethodId,
  ): Promise<boolean> => {
    return db
      .insert(cancellationMethodGoodsTable)
      .values({
        userId: userId,
        cancellationMethodId: cancellationMethodId,
      })
      .then(() => true)
      .catch((error) => {
        console.error(error);
        return false;
      });
  };

  public update = (
    userId: UserId,
    cancellationMethod: CancellationMethod,
  ): Promise<boolean> => {
    return dbSocket
      .transaction(async (tx) => {
        await tx
          .delete(cancellationStepsTable)
          .where(
            eq(
              cancellationStepsTable.cancellationMethodId,
              cancellationMethod.id,
            ),
          );

        const results = [
          tx
            .update(cancellationMethodsTable)
            .set({
              name: cancellationMethod.name,
              urlToCancel: cancellationMethod.urlToCancel ?? "",
              private: cancellationMethod.isPrivate,
              precautions: cancellationMethod.precautions,
              freeText: cancellationMethod.freeText,
              updatedAt: cancellationMethod.updatedAt.toString(),
            })
            .where(
              and(
                eq(cancellationMethodsTable.id, cancellationMethod.id),
                eq(cancellationMethodsTable.createdUserId, userId),
              ),
            )
            .then(() => true)
            .catch((error) => {
              console.error(error);
              throw error;
            }),
          tx
            .insert(cancellationStepsTable)
            .values(
              cancellationMethod.steps.map((step, index) => ({
                cancellationMethodId: cancellationMethod.id,
                sequentialOrder: index,
                procedure: step,
              })),
            )
            .then(() => true)
            .catch((error) => {
              console.error(error);
              throw error;
            }),
        ];

        return Promise.all(results).then((results) =>
          results.every((result) => result === true),
        );
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
  };

  public delete = (
    userId: UserId,
    cancellationMethodId: CancellationMethodId,
  ): Promise<boolean> => {
    return dbSocket
      .transaction(async (tx) => {
        await tx
          .update(subscriptionsTable)
          .set({
            cancellationMethodId: null,
          })
          .where(
            eq(subscriptionsTable.cancellationMethodId, cancellationMethodId),
          );
        await tx
          .delete(cancellationMethodsTable)
          .where(
            and(
              eq(cancellationMethodsTable.id, cancellationMethodId),
              eq(cancellationMethodsTable.createdUserId, userId),
            ),
          );
      })
      .then(() => true)
      .catch((error) => {
        console.error(error);
        return false;
      });
  };

  public deleteBookmark = (
    userId: UserId,
    cancellationMethodId: CancellationMethodId,
  ): Promise<boolean> => {
    return db
      .delete(cancellationMethodBookmarksTable)
      .where(
        and(
          eq(cancellationMethodBookmarksTable.userId, userId),
          eq(
            cancellationMethodBookmarksTable.cancellationMethodId,
            cancellationMethodId,
          ),
        ),
      )
      .then(() => true)
      .catch((error) => {
        console.error(error);
        return false;
      });
  };
  public deleteGood = (
    userId: UserId,
    cancellationMethodId: CancellationMethodId,
  ): Promise<boolean> => {
    return db
      .delete(cancellationMethodGoodsTable)
      .where(
        and(
          eq(cancellationMethodGoodsTable.userId, userId),
          eq(
            cancellationMethodGoodsTable.cancellationMethodId,
            cancellationMethodId,
          ),
        ),
      )
      .then(() => true)
      .catch((error) => {
        console.error(error);
        return false;
      });
  };

  private findManyAllCancellationSteps = async (
    cancellationMethodId: CancellationMethodId,
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
