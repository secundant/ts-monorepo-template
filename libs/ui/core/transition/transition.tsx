import { useChildrenForkRef } from '../../hooks';
import styles from './transition.module.css';
import { TransitionOptions } from './types';
import { useTransition } from './useTransition';
import clsx from 'clsx';
import { cloneElement, ForwardedRef, forwardRef, ReactElement } from 'react';

export interface TransitionProps extends TransitionOptions {
  children: ReactElement;
  type?: TransitionVariant;
}

export type TransitionVariant = 'Grow' | 'Fade' | 'Collapse';

export const Transition = forwardRef(function Transition(
  {
    children,
    type,
    open,
    duration,
    exitDuration,

    onExit,
    onEnter,
    onExited,
    onEntered,
    onExiting,
    onEntering,

    ...rest
  }: TransitionProps,
  ref: ForwardedRef<any>
) {
  const { status } = useTransition({
    open,
    duration,
    exitDuration,

    onExit,
    onEnter,
    onExited,
    onEntered,
    onExiting,
    onEntering
  });

  return cloneElement(children, {
    className: clsx(
      (children.props as any).className,
      type && styles[type],
      (rest as any).className
    ),
    'data-ui-transition-status': status,
    ref: useChildrenForkRef(children, ref),
    ...(rest as any)
  });
});

Transition.displayName = 'Transition';
