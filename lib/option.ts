export const some = Symbol();
export const none = Symbol();

export type Option<T> = { type: typeof some; value: T } | { type: typeof none };
