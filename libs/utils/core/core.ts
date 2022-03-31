export const toArray = <T>(value: T | T[]): T[] => (Array.isArray(value) ? value : [value]);

export const eq = (left: unknown, right: unknown): boolean => {
  if (Object.is(left, right)) return true;
  const type = getObjectType(left);

  if (type !== getObjectType(right)) return false;
  switch (type) {
    case 'Array':
      return eqArray(left as unknown[], right as unknown[]);
    // TODO Add Object support
    default:
      return false;
  }
};

export const eqArray = <T>(left: T[], right: T[]): boolean =>
  left.length === right.length && left.every((value, index) => eq(value, right[index]));

const getObjectType = (value: unknown) =>
  value === null ? 'Null' : Object.prototype.toString.call(value).slice(8, -1);
