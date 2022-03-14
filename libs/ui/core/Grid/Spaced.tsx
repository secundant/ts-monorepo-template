import styles from './Grid.module.css';
import clsx from 'clsx';
import { CSSProperties, ReactNode } from 'react';

export interface SpacedProps {
  className?: string;
  size?: number; // TODO Add size
  children: NonNullable<ReactNode>;
}

export function Spaced({ children, className, size = 16 }: SpacedProps) {
  return (
    <div
      className={clsx(`flex items-center flex-row`, styles.Spaced, className)}
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
