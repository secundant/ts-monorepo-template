export const objectFromArray = <T, K extends string | number>(
  list: T[],
  fn: (value: T) => K
): Record<K, T> => Object.fromEntries(list.map(value => [fn(value), value])) as Record<K, T>;
