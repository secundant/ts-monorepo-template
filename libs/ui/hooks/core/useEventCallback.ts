import { useUniversalLayoutEffect } from './useUniversalLayoutEffect';
import { useCallback, useRef } from 'react';

/**
 * Callback for user events without any revalidation
 * https://github.com/facebook/react/issues/14099#issuecomment-440013892
 */
export function useEventCallback<Args extends unknown[], Return>(
  fn: (...args: Args) => Return
): (...args: Args) => Return {
  const ref = useRef(fn);

  useUniversalLayoutEffect(() => {
    ref.current = fn;
  });
  return useCallback((...args: Args) => ref.current!(...args), []);
}
