import { SyntheticEvent } from 'react';

export const stopEvent = (e: Event | SyntheticEvent) => {
  e.stopPropagation();
  e.preventDefault();
};

/**
 * Shortcut for add/remove event (ex. in effects)
 */
export const subscribeToEvent = <K extends keyof HTMLElementEventMap, T extends HTMLElement = any>(
  target: T,
  type: K,
  handler: (event: HTMLElementEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
) => {
  target.addEventListener(type, handler, options);
  return () => target.removeEventListener(type, handler, options);
};
