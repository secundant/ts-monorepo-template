import { Paper } from '../card';
import { Modal } from '../modal';
import { Transition } from '../transition/transition';
import clsx from 'clsx';
import { ReactNode } from 'react';

export interface DialogProps {
  open?: boolean;
  onClose?(): void;
  className?: string;
  fullWidth?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg';
  children: NonNullable<ReactNode>;
}

export function Dialog({
  className,
  children,
  open,
  onClose,
  maxWidth = 'md',
  fullWidth
}: DialogProps) {
  return (
    <Modal open={open} onClose={onClose} transition backdrop="blur">
      <Transition type="Fade" open={open}>
        <Paper
          role="dialog"
          className={clsx(
            'absolute-center max-h-[calc(100%-32px)] overflow-y-auto outline-none px-0 py-0',
            fullWidth && 'w-[calc(100%-32px)]',
            maxWidth && maxWidthClass[maxWidth],
            className
          )}
        >
          {children}
        </Paper>
      </Transition>
    </Modal>
  );
}

const maxWidthClass = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg'
};
