import clsx from 'clsx';
import { ReactNode } from 'react';

export interface DialogContentProps {
  className?: string;
  children: NonNullable<ReactNode>;
}

export function DialogContent({ children, className }: DialogContentProps) {
  return <div className={clsx('px-6 pb-6', className)}>{children}</div>;
}
