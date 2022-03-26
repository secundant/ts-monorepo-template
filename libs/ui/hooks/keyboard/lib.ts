import { HotkeyEvent, HotkeyHandlerEntry, KeyboardHotKey, KeyboardModifierKey } from './types';
import { assoc } from '@libs/utils/core/object/assoc';

export function getHotkeyHandler<E extends HotkeyEvent>(items: Array<HotkeyHandlerEntry<E>>) {
  const matchedHandler = items.map(([hotkey, handler]) => [matchHotkey(hotkey), handler]);

  return (event: HotkeyEvent) => {
    for (const [matches, handler] of matchedHandler) {
      if (matches(event as E)) {
        event.preventDefault();
        handler(event as E);
      }
    }
  };
}

export function matchHotkey(hotkey: KeyboardHotKey) {
  const info = parseHotkey(hotkey);

  return (event: HotkeyEvent) => validateHotkeyEvent(info, event);
}

export function parseHotkey(hotkey: KeyboardHotKey): ParsedInfo {
  const keys = hotkey
    .toLowerCase()
    .split('+')
    .map(part => part.trim());
  const modifiersInfo = modifiers.reduce(
    (acc, key) => assoc(key, keys.includes(key), acc),
    {} as ParsedModifiersInfo
  );

  return {
    ...modifiersInfo,
    key: keys.find(key => !modifiers.includes(key as ParsedModifier))!
  };
}

export function isNonInputKeyboardEvent(event: KeyboardEvent) {
  if (event.target instanceof HTMLElement) {
    return !['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName);
  }
  return true;
}

function validateHotkeyEvent(
  { alt, key, mod, meta, shift, ctrl }: ParsedInfo,
  { altKey, ctrlKey, metaKey, shiftKey, key: pressedKey, code }: HotkeyEvent
): boolean {
  // Check modifiers pressed and key exists
  if (
    !key ||
    alt !== altKey ||
    // "mod" means "ctrl OR meta"
    (mod && !ctrlKey && !metaKey) ||
    (ctrl && !ctrlKey) ||
    (meta && !metaKey) ||
    (shift && !shiftKey)
  ) {
    return false;
  }

  return pressedKey.toLowerCase() === key || code.replace('Key', '').toLowerCase() === key;
}

const modifiers: ParsedModifier[] = ['alt', 'ctrl', 'meta', 'shift', 'mod'];

type ParsedModifier = Lowercase<KeyboardModifierKey>;
type ParsedModifiersInfo = Record<ParsedModifier, boolean>;
interface ParsedInfo extends ParsedModifiersInfo {
  key: string;
}
