import clsx from 'clsx';
import { ReactNode } from 'react';

export interface CardProps {
  className?: string;
  children: NonNullable<ReactNode>;
}

export function Card({ children, className }: CardProps) {
  return <div className={clsx('bg-white', className)}>{children}</div>;
}
