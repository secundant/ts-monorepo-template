export const assoc = <T extends {}, K extends keyof T>(key: K, value: T[K], target: T): T => {
  target[key] = value;
  return target;
};
