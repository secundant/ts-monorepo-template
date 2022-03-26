import { Transition } from '../transition/transition';
import clsx from 'clsx';
import { MouseEvent } from 'react';

export interface BackdropProps {
  invisible?: boolean;
  blurred?: boolean;
  open?: boolean;
  onClick?(e: MouseEvent): void;
}

export function Backdrop({ invisible, onClick, open, blurred }: BackdropProps) {
  const element = (
    <div
      className={clsx(
        'fixed inset-0 flex items-center justify-center',
        invisible ? 'bg-transparent' : 'bg-black/50',
        !invisible && blurred && 'backdrop-blur-sm'
      )}
      onClick={onClick}
      aria-hidden
    />
  );

  if (invisible) {
    return open ? element : null;
  }
  return (
    <Transition type="Fade" open={open}>
      {element}
    </Transition>
  );
}
