import { useChildrenForkRef } from '../../hooks';
import { TransitionDuration } from './constants';
import styles from './transition.module.css';
import { SharedTransitionProps } from './types';
import clsx from 'clsx';
import { cloneElement, ForwardedRef, forwardRef, ReactElement } from 'react';
import { Transition, TransitionStatus } from 'react-transition-group';

export interface GrowProps<Ref extends HTMLElement> extends SharedTransitionProps<Ref> {
  children: ReactElement;
}

export const Grow = forwardRef(
  <Ref extends HTMLElement>(
    { children, in: inProp, ...transitionProps }: GrowProps<Ref>,
    ref: ForwardedRef<Ref>
  ) => {
    const forkRef = useChildrenForkRef(children, ref);

    return (
      <Transition in={inProp} timeout={timeout} {...transitionProps}>
        {(state: TransitionStatus, childProps: any) =>
          cloneElement(children, {
            className: clsx(children.props.className, styles.Grow),
            'data-ui-transition-status': state,
            ref: forkRef,
            ...childProps
          })
        }
      </Transition>
    );
  }
);

Grow.displayName = 'Grow';

const timeout = {
  enter: TransitionDuration.enteringScreen,
  exit: TransitionDuration.leavingScreen
};
