export type KeyboardCode =
  | 'Escape'
  | 'Enter'
  | 'Space'
  | 'End'
  | 'Home'
  | 'ArrowUp'
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'ArrowRight'
  | `Key${string}`;

export enum KeyboardModifier {
  Ctrl = 'Ctrl',
  Shift = 'Shift'
}

export type KeyboardHotKey =
  | KeyboardCode
  | `${KeyboardModifier.Ctrl}+${KeyboardCode}`
  | `${KeyboardModifier.Shift}+${KeyboardCode}`
  | `${KeyboardModifier.Ctrl}+${KeyboardModifier.Shift}+${KeyboardCode}`;
