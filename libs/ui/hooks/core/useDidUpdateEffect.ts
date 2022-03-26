import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

export function useDidUpdateEffect(fn: EffectCallback, deps?: DependencyList) {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) {
      return fn();
    } else {
      mounted.current = true;
    }
  }, deps);
}
