import { subscribeToEvent } from '../../lib/dom';
import { getHotkeyHandler, isNonInputKeyboardEvent } from './lib';
import { HotkeyEvent, HotkeyHandlerEntry } from './types';
import React, { DependencyList, useEffect, useMemo } from 'react';

export function useGlobalHotkey<E extends HotkeyEvent>(
  handlers: Array<HotkeyHandlerEntry<E>>,
  deps?: DependencyList
) {
  useEffect(() => {
    const hotkeyHandler = getHotkeyHandler(handlers);
    const keydownListener = (event: KeyboardEvent) => {
      if (isNonInputKeyboardEvent(event)) {
        hotkeyHandler(event);
      }
    };

    return subscribeToEvent(document.documentElement, 'keydown', keydownListener);
  }, deps ?? [handlers]);
}

export function useHotkeyCallback(
  handlers: Array<HotkeyHandlerEntry<React.KeyboardEvent>>,
  deps?: DependencyList
) {
  return useMemo(() => getHotkeyHandler(handlers), deps ?? [handlers]);
}
