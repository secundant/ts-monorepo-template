import { HTMLElementCoreProps } from '../../types';
import clsx from 'clsx';
import { ChangeEvent, ForwardedRef, forwardRef, HTMLInputTypeAttribute } from 'react';

export interface HtmlInputProps extends HTMLElementCoreProps {
  type?: HTMLInputTypeAttribute;
  value?: string;
  disabled?: boolean;
  onChange?(e: ChangeEvent<HTMLInputElement>): void;
  placeholder?: string;
}

/**
 * Basic styled HTML input without any additional controls.
 * Probably useless in real world because it cannot be customized
 */
export const HtmlInput = forwardRef(function HtmlInput(
  { className, onChange, disabled, value, id, type, role, placeholder }: HtmlInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <input
      id={id}
      ref={ref}
      type={type}
      role={role}
      value={value}
      disabled={disabled}
      aria-disabled={disabled}
      onChange={onChange}
      placeholder={placeholder}
      className={clsx(
        'input-box placeholder:text-gray-500 text-black p-2',
        'focus:outline focus:border-primary-main',
        !disabled && 'transition',
        disabled && 'border-gray-100 text-gray-900',
        className
      )}
    />
  );
});

HtmlInput.displayName = 'HtmlInput';
