import { useChildrenForkRef } from '../../hooks';
import { focusTabbable, getOwnerDocument, isElementContainsFocus } from '../../lib/dom';
import { cloneElement, ReactElement, useEffect, useRef } from 'react';

export interface TrapFocusProps {
  active: boolean;
  children: ReactElement;

  isEnabled?(): boolean;
}

export function TrapFocus({ children, active, isEnabled = T }: TrapFocusProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const sentinelEndRef = useRef<HTMLDivElement>(null);
  const sentinelStartRef = useRef<HTMLDivElement>(null);

  const childrenForkRef = useChildrenForkRef(children, rootRef);

  useEffect(() => {
    const element = rootRef.current;

    if (!element || !active || !isEnabled()) return;
    const timer = setTimeout(() => {
      if (isElementContainsFocus(element)) return;
      const autoFocus = element.querySelector('[data-ui-autofocus="true"]');

      ((autoFocus as HTMLElement) ?? element).focus();
    }, 50);

    return () => clearTimeout(timer);
  }, [active]);

  useEffect(() => {
    if (!active || !rootRef.current || !isEnabled()) return;
    let lastKeydown: KeyboardEvent | null = null;
    const rootDocument = getOwnerDocument(rootRef.current);

    const forceFocus = () => {
      if (!rootRef.current) return;
      if (isEnabled() && !isElementContainsFocus(rootRef.current)) {
        const preferChildrenTabbable =
          rootDocument.activeElement === sentinelEndRef.current ||
          rootDocument.activeElement === sentinelStartRef.current;

        const shouldFocusLast = Boolean(lastKeydown?.shiftKey && lastKeydown?.key === 'Tab');

        focusTabbable(rootRef.current!, preferChildrenTabbable, shouldFocusLast);
      }
    };
    const handleKeyDown = (nativeEvent: KeyboardEvent) => {
      lastKeydown = nativeEvent;

      if (!isEnabled() || nativeEvent.key !== 'Tab') return;

      // Make sure the next tab starts from the right place.
      // doc.activeElement referes to the origin.
      if (rootDocument.activeElement === rootRef.current && nativeEvent.shiftKey) {
        sentinelEndRef.current?.focus();
      }
    };

    rootDocument.addEventListener('focusin', forceFocus);
    rootDocument.addEventListener('keydown', handleKeyDown, true);

    // With Edge, Safari and Firefox, no focus related events are fired when the focused area stops being a focused area.
    // e.g. https://bugzilla.mozilla.org/show_bug.cgi?id=559561.
    // Instead, we can look if the active element was restored on the BODY element.
    //
    // The whatwg spec defines how the browser should behave but does not explicitly mention any events:
    // https://html.spec.whatwg.org/multipage/interaction.html#focus-fixup-rule.
    const interval = setInterval(() => {
      if (rootDocument.activeElement?.tagName === 'BODY') {
        forceFocus();
      }
    }, 50);

    return () => {
      clearInterval(interval);
      rootDocument.removeEventListener('focusin', forceFocus);
      rootDocument.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [active, isEnabled]);

  return (
    <>
      <div tabIndex={0} ref={sentinelStartRef} data-element-id="sentinel-start" />

      {cloneElement(children, { ref: childrenForkRef })}

      <div tabIndex={0} ref={sentinelEndRef} data-element-id="sentinel-end" />
    </>
  );
}

const T = () => true;
