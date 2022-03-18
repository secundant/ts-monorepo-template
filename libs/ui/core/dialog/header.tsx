import clsx from 'clsx';
import { ReactNode } from 'react';

export interface DialogHeaderProps {
  className?: string;
  children: NonNullable<ReactNode>;
}

export function DialogHeader({ children, className }: DialogHeaderProps) {
  return <div className={clsx('bg-white', className)}>{children}</div>;
}
