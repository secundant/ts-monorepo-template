export interface Debounced<This, Args extends any[]> {
  (this: This, ...args: Args): void;
  clear(): void;
  /**
   * Original function
   */
  fn(this: This, ...args: Args): any;
}

// Corresponds to 10 frames at 60 Hz.
// A few bytes payload overhead when lodash/debounce is ~3 kB and debounce ~300 B.
export function debounce<This, Args extends any[]>(
  fn: (this: This, ...args: Args) => any,
  wait = 166
): Debounced<This, Args> {
  let timeout: ReturnType<typeof setTimeout>;

  function debounced(this: This, ...args: Args) {
    debounced.clear();
    timeout = setTimeout(() => fn.apply(this, args), wait);
  }
  debounced.fn = fn;
  debounced.clear = () => clearTimeout(timeout);
  return debounced;
}
