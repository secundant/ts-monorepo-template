import { PropsOf } from '../../types';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, ReactNode } from 'react';

export interface PaperProps extends PropsOf<'div'> {
  children?: ReactNode;
  disablePadding?: boolean;
}

export const Paper = forwardRef(
  (
    { children, className, disablePadding, ...props }: PaperProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => (
    <div className={clsx('bg-white rounded-md shadow-xl', className)} ref={ref} {...props}>
      {children}
    </div>
  )
);

Paper.displayName = 'Paper';
