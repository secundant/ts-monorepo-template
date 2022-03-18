import { useChildrenForkRef } from '../../hooks';
import { TransitionDuration } from './constants';
import styles from './transition.module.css';
import { SharedTransitionProps } from './types';
import clsx from 'clsx';
import { cloneElement, ForwardedRef, forwardRef, ReactElement } from 'react';
import { Transition, TransitionStatus } from 'react-transition-group';

export interface FadeProps<Ref extends HTMLElement> extends SharedTransitionProps<Ref> {
  children: ReactElement;
}

export const Fade = forwardRef(function Fade<Ref extends HTMLElement>(
  { children, in: inProp, ...transitionProps }: FadeProps<Ref>,
  ref: ForwardedRef<Ref>
) {
  const forkRef = useChildrenForkRef(children, ref);

  return (
    <Transition in={inProp} timeout={timeout} {...transitionProps}>
      {(state: TransitionStatus, childProps: any) =>
        cloneElement(children, {
          className: clsx(styles.Fade, children.props.className),
          'data-ui-transition-status': state,
          ref: forkRef,
          ...childProps
        })
      }
    </Transition>
  );
});

Fade.displayName = 'Fade';

const timeout = {
  enter: TransitionDuration.enteringScreen,
  exit: TransitionDuration.leavingScreen
};
