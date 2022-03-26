import clsx from 'clsx';
import { forwardRef, ReactNode } from 'react';

export interface InputProps {
  className?: string;
  children: NonNullable<ReactNode>;
}

export const Input = forwardRef(function Input({ children, className }: InputProps, ref: any) {
  return (
    <div ref={ref} className={clsx('bg-white', className)}>
      {children}
    </div>
  );
});

Input.displayName = 'Input';
