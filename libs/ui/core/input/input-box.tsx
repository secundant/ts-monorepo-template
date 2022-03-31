import { PropsOf, UISize } from '../../types';
import { InputStatesProps } from './types';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, ReactNode } from 'react';

export interface InputBoxProps extends InputStatesProps, PropsOf<'div'> {
  children: NonNullable<ReactNode>;
  tabIndex?: number;
  size?: Extract<UISize, 'sm' | 'md'>;
}

export const InputBox = forwardRef(
  (
    {
      children,
      className,
      invalid,
      loading,
      disabled,
      focused,
      size = 'md',
      role = 'textbox',
      ...props
    }: InputBoxProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => (
    <div
      ref={ref}
      role={role}
      aria-disabled={disabled || loading}
      aria-invalid={invalid}
      className={clsx(
        'input-box flex flex-row items-stretch justify-between',
        focused && 'outline-1 outline-primary-main border-primary-main',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

InputBox.displayName = 'InputBox';

const sizeClasses = {
  sm: 'h-8',
  md: 'h-10'
};
