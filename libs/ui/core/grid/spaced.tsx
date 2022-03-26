import styles from './grid.module.css';
import clsx from 'clsx';
import { CSSProperties, ReactNode } from 'react';

export interface SpacedProps {
  className?: string;
  size?: number; // TODO Add size
  children: NonNullable<ReactNode>;
  direction?: 'row' | 'column';
  wrap?: boolean;
  align?: 'start' | 'end' | 'center';
}

export function Spaced({ children, className, size = 16, direction = 'row', wrap }: SpacedProps) {
  return (
    <div
      className={clsx(
        styles.Spaced,
        directions[direction],
        wrap ? 'flex-wrap' : 'flex-nowrap',
        className
      )}
      style={
        {
          '--spaced-size': `${size}px`
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

const directions = {
  row: 'flex-row',
  column: 'flex-col'
};
