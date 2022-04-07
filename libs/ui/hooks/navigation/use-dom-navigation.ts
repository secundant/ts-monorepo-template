import { getCurrentFocused, tryFocusElement } from '../../lib/dom';
import { DependencyList, useMemo, useRef } from 'react';

export interface UseDomNavigationParams {
  navigate?(element: HTMLElement): void;
  getCurrent?(): Element | null;
}

export function useDomNavigation(
  { navigate = tryFocusElement, getCurrent = getCurrentFocused }: UseDomNavigationParams,
  deps: DependencyList
) {
  const listRef = useRef<Element>(null);

  return useMemo(
    () => ({
      listRef,
      next: () => applyNavigation(listRef.current!, getCurrent(), getNext, navigate),
      prev: () => applyNavigation(listRef.current!, getCurrent(), getPrev, navigate),
      last: () => applyNavigation(listRef.current!, null, getPrev, navigate),
      first: () => applyNavigation(listRef.current!, null, getNext, navigate)
    }),
    deps
  );
}

function applyNavigation(
  root: Element,
  item: Element | null,
  fn: TraversalFn,
  focus: (element: HTMLElement) => void
): void {
  let element = fn(root, item);
  let wrapped = false;

  while (element) {
    if (element === root.firstElementChild) {
      if (wrapped) return;
      wrapped = true;
    }
    if (isValidElement(element)) {
      focus(element);
      return;
    }
    console.log('[tick]', { element, next: fn(root, element) });
    element = fn(root, element);
  }
}

const isValidElement = (item: Element | null): item is HTMLElement =>
  !!item &&
  !(item as any).disabled &&
  item.getAttribute('aria-disabled') !== 'true' &&
  item.hasAttribute('tabindex');

const getNext: TraversalFn = (root, item) =>
  root === item ? root.firstElementChild : item?.nextElementSibling ?? root.firstElementChild;
const getPrev: TraversalFn = (root, item) =>
  root === item ? root.lastElementChild : item?.previousElementSibling ?? root.lastElementChild;

type TraversalFn = (root: Element, item: Element | null) => Element | null;
