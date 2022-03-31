// TODO Add support for every variable
export function isEmpty(value: unknown) {
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  return !!value;
}
