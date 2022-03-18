import { MouseEvent } from 'react';

export interface TouchableElementProps<E extends Element = Element> {
  disabled?: boolean;
  onClick?(e: MouseEvent<E>): void;

  onMouseUp?(e: MouseEvent<E>): void;

  onMouseDown?(e: MouseEvent<E>): void;
}
