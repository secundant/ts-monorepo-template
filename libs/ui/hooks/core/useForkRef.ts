import { getChildrenRef, mergeTernaryRefs } from '../../lib/refs';
import { Nil } from '../../types';
import { ReactNode, Ref, useMemo } from 'react';

export function useForkRef<Instance>(
  refA: Ref<Instance> | Nil,
  refB: Ref<Instance> | Nil
): Ref<Instance> | null {
  /**
   * This will create a new function if the ref props change and are defined.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior.
   */
  return useMemo(() => (refA || refB ? mergeTernaryRefs(refA, refB) : null), [refA, refB]);
}

export function useChildrenForkRef<T>(children: ReactNode, ref: Ref<T> | Nil) {
  return useForkRef(getChildrenRef(children), ref);
}
