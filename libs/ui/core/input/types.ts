import { HTMLElementCoreProps, KeyboardProps } from '../../types';
import { ChangeEvent, HTMLInputTypeAttribute } from 'react';

export interface InputStatesProps {
  invalid?: boolean;
  focused?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

export interface InputSharedProps extends InputStatesProps, HTMLElementCoreProps, KeyboardProps {
  type?: HTMLInputTypeAttribute;
  value?: string;
  onChange?(e: ChangeEvent<HTMLInputElement>): void;
  placeholder?: string;
}
