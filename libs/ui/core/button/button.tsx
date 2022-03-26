import { getColorVariable, mergeStyle } from '../../lib/theme';
import { PropsOf, UIMainColorName, UISize } from '../../types';
import clsx from 'clsx';
import { ReactNode } from 'react';

export interface ButtonProps extends PropsOf<'button'> {
  appearance?: ButtonAppearance;
  children: NonNullable<ReactNode>;
  disabled?: boolean;
  size?: UISize;
  color?: UIMainColorName;
}

export type ButtonAppearance = 'contained' | 'outlined' | 'text';

export function Button({
  children,
  appearance = 'contained',
  color = 'primary',
  disabled,
  size = 'md',
  className,
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'button focus-visible-ring',
        sizeClasses[size],
        appearanceClasses[appearance],
        className
      )}
      style={mergeStyle(style, {
        '--button-color': getColorVariable(`${color}-main`)
      })}
      {...props}
    >
      {children}
    </button>
  );
}

const sizeClasses = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-12 px-6 text-lg'
};
const appearanceClasses = {
  contained: 'button-contained',
  outlined: 'button-outlined',
  text: 'button-text'
};
