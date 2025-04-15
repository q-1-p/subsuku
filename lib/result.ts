export const ok = Symbol("ok");
export const err = Symbol("err");

export type Result<T, E> =
  | { type: typeof ok; value: T }
  | { type: typeof err; error: E };
