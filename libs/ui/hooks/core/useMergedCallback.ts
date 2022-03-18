import { useCallback } from 'react';

export function useMergedCallback<Args extends any[]>(
  ...fns: Array<((...args: Args) => any) | null | undefined>
): (...args: Args) => void {
  return useCallback((...args: Args) => {
    for (const fn of fns) {
      if (fn) fn(...args);
    }
  }, fns);
}
