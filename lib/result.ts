export const ok = Symbol();
export const err = Symbol();

export type Result<T, E> =
  | { type: typeof ok; value: T }
  | { type: typeof err; error: E };
