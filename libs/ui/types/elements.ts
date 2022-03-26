import { MergeProps, PropsOf } from './common';
import {
  AriaAttributes,
  AriaRole,
  CSSProperties,
  ElementType,
  KeyboardEvent,
  MouseEvent
} from 'react';

export interface HTMLElementCoreProps {
  id?: string;
  role?: AriaRole;
  style?: CSSProperties;
  className?: string;
}

export interface HTMLElementProps extends HTMLElementCoreProps, AriaAttributes {
  title?: string;
}

export interface TouchableElementProps<E extends Element = Element> {
  disabled?: boolean;

  onClick?(e: MouseEvent<E>): void;

  onMouseUp?(e: MouseEvent<E>): void;

  onMouseDown?(e: MouseEvent<E>): void;
}

export interface KeyboardProps<E extends Element = Element> {
  onKeyPress?(e: KeyboardEvent<E>): void;
  onKeyDown?(e: KeyboardEvent<E>): void;
  onKeyUp?(e: KeyboardEvent<E>): void;
}

/**
 * Overrides
 */

export interface OverrideAsProps<C extends ElementType> {
  as?: C;
}

export type PolymorphicProps<C extends ElementType, Props = {}> = MergeProps<
  Props & OverrideAsProps<C>,
  PropsOf<C>
>;
