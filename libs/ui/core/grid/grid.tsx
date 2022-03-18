import clsx from 'clsx';
import { ReactNode } from 'react';

export interface GridProps {
  className?: string;
  children: NonNullable<ReactNode>;
}

export function Grid({ children, className }: GridProps) {
  return <div className={clsx('bg-white', className)}>{children}</div>;
}
