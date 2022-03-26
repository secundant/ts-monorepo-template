import { UISize } from '../../types';
import { InputSharedProps } from './types';
import clsx from 'clsx';
import { ForwardedRef, forwardRef } from 'react';

export interface HtmlInputProps extends Omit<InputSharedProps, 'focused'> {
  size?: Extract<UISize, 'sm' | 'md'>;
}

/**
 * Basic styled HTML input without any additional controls.
 * Probably useless in real world because it cannot be customized
 */
export const HtmlInput = forwardRef(function HtmlInput(
  { className, disabled, size = 'md', ...props }: HtmlInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <input
      ref={ref}
      disabled={disabled}
      aria-disabled={disabled}
      className={clsx(
        'input-box placeholder:text-gray-500 text-black p-2',
        'focus:outline focus:border-primary-main',
        !disabled && 'transition',
        disabled && 'border-gray-100 text-gray-700 placeholder:text-gray-300',
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
});

HtmlInput.displayName = 'HtmlInput';

const sizeClasses = {
  sm: 'h-8',
  md: 'h-10'
};
