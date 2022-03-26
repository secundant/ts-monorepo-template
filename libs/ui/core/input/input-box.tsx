import { HTMLElementCoreProps } from '../../types';
import { InputStatesProps } from './types';
import clsx from 'clsx';
import { ReactNode } from 'react';

export interface InputBoxProps extends InputStatesProps, HTMLElementCoreProps {
  children: NonNullable<ReactNode>;
  tabIndex?: number;
}

export function InputBox({
  children,
  className,
  invalid,
  // loading,
  id,
  disabled,
  focused,
  role = 'textbox'
}: // style
InputBoxProps) {
  return (
    <div
      id={id}
      role={role}
      aria-disabled={disabled}
      aria-invalid={invalid}
      className={clsx('input-box', focused && 'border-primary-main', className)}
    >
      {children}
    </div>
  );
}
