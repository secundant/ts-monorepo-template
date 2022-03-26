import { useDidUpdateEffect } from '../core';
import { useRef } from 'react';

export function useFocusReturnToLast(open: boolean, disabled = false) {
  const targetRef = useRef<Element | null>(null);

  useDidUpdateEffect(() => {
    if (open) {
      targetRef.current = document.activeElement ?? targetRef.current;
    } else if (!disabled && isFocusable(targetRef.current)) {
      targetRef.current.focus();
      targetRef.current = null;
    }
  }, [open]);
}

const isFocusable = (element: Element | null): element is HTMLElement =>
  element !== null && 'focus' in element && typeof (element as HTMLElement).focus === 'function';
