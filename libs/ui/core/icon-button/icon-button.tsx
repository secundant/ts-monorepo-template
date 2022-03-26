import { getColorVariable, mergeStyle } from '../../lib/theme';
import { HTMLElementProps, TouchableElementProps, UIMainColorName, UISize } from '../../types';
import clsx from 'clsx';
import { ReactNode } from 'react';

export interface IconButtonProps
  extends HTMLElementProps,
    TouchableElementProps<HTMLButtonElement> {
  children: NonNullable<ReactNode>;
  color?: UIMainColorName;
  size?: UISize;
}

export function IconButton({
  children,
  className,
  disabled,
  color,
  style,
  size = 'md',
  ...props
}: IconButtonProps) {
  return (
    <button
      className={clsx(
        'button-base focus-visible-ring transition border-none rounded-full bg-transparent justify-center',
        !disabled && 'hover:bg-gray-100 active:scale-95 focus:bg-gray-300',
        sizeClasses[size],
        className
      )}
      style={mergeStyle(
        style,
        color && {
          color: getColorVariable(`${color}-main`)
        }
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

const sizeClasses: Record<UISize, string> = {
  sm: 'w-size-sm h-size-sm text-md',
  md: 'w-size-md h-size-md text-2xl',
  lg: 'w-size-lg h-size-lg text-3xl'
};
