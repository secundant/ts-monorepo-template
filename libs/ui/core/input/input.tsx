import clsx from 'clsx';
import { ReactNode } from 'react';

export interface InputProps {
  className?: string;
  children: NonNullable<ReactNode>;
}

export function Input({ children, className }: InputProps) {
  return <div className={clsx('bg-white', className)}>{children}</div>;
}
