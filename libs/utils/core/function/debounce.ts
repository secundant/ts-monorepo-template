// Corresponds to 10 frames at 60 Hz.
// A few bytes payload overhead when lodash/debounce is ~3 kB and debounce ~300 B.
export function debounce<This, Args extends any[]>(
  func: (this: This, ...args: Args) => any,
  wait = 166
): {
  (this: This, ...args: Args): void;
  clear(): void;
} {
  let timeout: any;
  const clear = () => clearTimeout(timeout);

  function debounced(this: This, ...args: Args) {
    clear();
    timeout = setTimeout(() => func.apply(this, args), wait);
  }

  debounced.clear = clear;
  return debounced;
}
