export const includes =
  <T>(value: T) =>
  (list: T[]) =>
    list.includes(value);

export const includesIn =
  <T>(list: T[]) =>
  (value: T) =>
    list.includes(value);

export const negate =
  <Args extends any[]>(fn: (...args: Args) => boolean) =>
  (...args: Args) =>
    !fn(...args);

export const identity = <T>(value: T) => value;
export const noop = () => void 0;
