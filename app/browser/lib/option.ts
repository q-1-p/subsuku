export const some = Symbol("some");
export const none = Symbol("none");

export type Option<T> = { type: typeof some; value: T } | { type: typeof none };
