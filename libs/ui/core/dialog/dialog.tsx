import { Paper } from '../card';
import { Modal } from '../modal';
import { Fade } from '../transition';
import clsx from 'clsx';
import { ReactNode } from 'react';

export interface DialogProps {
  open?: boolean;
  onClose?(): void;
  className?: string;
  fullWidth?: boolean;
  maxWidth?: 'md';
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
    <Modal open={open} onClose={onClose} transition>
      <Fade in={open} appear>
        <Paper
          role="dialog"
          className={clsx(
            'absolute-center max-h-[calc(100%-32px)] overflow-y-auto',
            fullWidth && 'w-[calc(100%-32px)]',
            maxWidth && 'max-w-screen-lg',
            className
          )}
        >
          {children}
        </Paper>
      </Fade>
    </Modal>
  );
}
