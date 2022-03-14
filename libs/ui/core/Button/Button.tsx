import clsx from 'clsx';
import { ReactNode } from 'react';

export interface ButtonProps {
  appearance?: ButtonAppearance;
  children: NonNullable<ReactNode>;
  disabled?: boolean;
  size?: ButtonSize;
  color?: 'primary' | 'secondary';
}

export type ButtonAppearance = 'contained' | 'outlined' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg';

export function Button({
  children,
  appearance = 'contained',
  color = 'primary',
  disabled,
  size = 'md'
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'relative rounded-md',
        {
          [`text-${color}-main bg-transparent`]: appearance === 'text' || appearance === 'outlined',
          [`bg-${color}-main text-white`]: appearance === 'contained',
          [`border border-${color}-main`]: appearance === 'outlined'
        },
        !disabled && {
          transition: true,
          [`hover:bg-${color}-dark`]: appearance === 'contained',
          [`hover:bg-${color}-main/25`]: appearance === 'text' || appearance === 'outlined'
        },
        {
          'px-2 py-1': size === 'sm',
          'px-4 py-2': size === 'md',
          'px-6 py-3': size === 'lg'
        }
      )}
    >
      {children}
    </button>
  );
}
