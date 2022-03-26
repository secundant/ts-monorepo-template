import { Typography } from '../typography';
import clsx from 'clsx';
import { ReactNode } from 'react';

export interface DialogHeaderProps {
  className?: string;
  children: NonNullable<ReactNode>;
}

export function DialogHeader({ children, className }: DialogHeaderProps) {
  return (
    <Typography type="h6" as="h2" className={clsx('px-6 py-4', className)}>
      {children}
    </Typography>
  );
}
