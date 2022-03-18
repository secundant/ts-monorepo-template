import { Nil } from '../types';
import { isValidElement, MutableRefObject, ReactNode, Ref, RefCallback } from 'react';

/**
 * WARNING: Be sure to only call this inside a callback that is passed as a ref.
 * Otherwise, make sure to cleanup the previous {ref} if it changes.
 *
 * Useful if you want to expose the ref of an inner component to the public API
 * while still using it inside the component.
 * @param ref A ref callback or ref object. If anything falsy, this is a no-op.
 * @param value Ref value
 */
export default function setRef<T>(
  ref: MutableRefObject<T | null> | ((instance: T | null) => void) | Nil,
  value: T | null
): void {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

export const getChildrenRef = <T = any>(children: ReactNode): Ref<T> | null =>
  isValidElement(children) ? (children as any).ref ?? null : null;

export const mergeTernaryRefs =
  <T>(left: Ref<T> | Nil, right: Ref<T> | Nil): RefCallback<T> =>
  (refValue: T) => {
    setRef(left, refValue);
    setRef(right, refValue);
  };
