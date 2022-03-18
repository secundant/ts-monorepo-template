import { Fade } from '../transition';
import clsx from 'clsx';
import { MouseEvent } from 'react';

export interface BackdropProps {
  invisible?: boolean;
  open?: boolean;
  onClick?(e: MouseEvent): void;
}

export function Backdrop({ invisible, onClick, open }: BackdropProps) {
  const element = (
    <div
      className={clsx(
        'fixed inset-0 flex items-center justify-center',
        invisible ? 'bg-transparent' : 'bg-black/50'
      )}
      onClick={onClick}
      aria-hidden
    />
  );

  if (invisible) {
    return open ? element : null;
  }
  return <Fade in={open}>{element}</Fade>;
}
