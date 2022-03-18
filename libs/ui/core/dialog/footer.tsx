import clsx from 'clsx';
import { ReactNode } from 'react';

export interface DialogFooterProps {
  className?: string;
  children: NonNullable<ReactNode>;
}

export function DialogFooter({ children, className }: DialogFooterProps) {
  return <div className={clsx('bg-white', className)}>{children}</div>;
}
