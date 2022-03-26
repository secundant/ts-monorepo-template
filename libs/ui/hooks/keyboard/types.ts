import React from 'react';

export type KeyboardHotKey =
  | KeyboardKey
  | `${KeyboardModifierKey}+${KeyboardKey}`
  | `${KeyboardModifierKey}+${KeyboardModifierKey}+${KeyboardKey}`
  | `${KeyboardModifierKey}+${KeyboardModifierKey}+${KeyboardModifierKey}+${KeyboardKey}`;

export type HotkeyEvent = React.KeyboardEvent | KeyboardEvent;
export type HotkeyHandlerFn<E extends HotkeyEvent> = (event: E) => any;
export type HotkeyHandlerEntry<E extends HotkeyEvent> = [KeyboardHotKey, HotkeyHandlerFn<E>];

export type KeyboardWhitespaceKey = 'Enter' | 'Tab';
export type KeyboardNavigationKey =
  | 'ArrowUp'
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'End'
  | 'Home'
  | 'PageUp'
  | 'PageDown';
export type KeyboardModifierKey = 'Alt' | 'Shift' | 'Ctrl' | 'Meta' | 'Mod';
export type KeyboardEditingKey = 'Backspace' | 'Delete' | 'Insert' | 'Clear';
export type KeyboardUIKey = 'ContextMenu' | 'Escape' | `Key${string}` | string;

export type KeyboardKey =
  | KeyboardWhitespaceKey
  | KeyboardNavigationKey
  | KeyboardEditingKey
  | KeyboardUIKey;
