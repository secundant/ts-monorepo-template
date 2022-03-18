import clsx from 'clsx';
import { ForwardedRef, forwardRef, ReactNode } from 'react';

export interface PaperProps {
  className?: string;
  children: NonNullable<ReactNode>;
  role?: string; // TODO Move to shared props
}

export const Paper = forwardRef(
  ({ children, className, ...props }: PaperProps, ref: ForwardedRef<HTMLDivElement>) => (
    <div
      className={clsx('bg-white rounded-md shadow-xl px-4 py-2', className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
);

Paper.displayName = 'Paper';
