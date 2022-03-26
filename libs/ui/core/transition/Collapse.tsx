import { useForkCallback } from '../../hooks';
import { TransitionDuration } from './constants';
import { Transition, TransitionProps } from './transition';
import styles from './transition.module.css';
import { ForwardedRef, forwardRef, useRef } from 'react';

export const Collapse = forwardRef(function Collapse(
  { children, open, onEnter, onExit, onExiting, ...props }: TransitionProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const rootRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const getSize = () => wrapperRef.current?.clientHeight ?? 0;
  const handleEnter = () => {
    rootRef.current!.style.setProperty(CSS_HEIGHT_VAR, `${getSize()}px`);
    rootRef.current!.style.removeProperty(CSS_HEIGHT_EXIT_VAR);
  };
  const handleExit = () => {
    rootRef.current!.style.setProperty(CSS_HEIGHT_EXIT_VAR, `${getSize()}px`);
  };
  const handleExiting = () => {
    requestAnimationFrame(() => {
      rootRef.current!.style.removeProperty(CSS_HEIGHT_EXIT_VAR);
    });
  };

  return (
    <Transition
      ref={ref as any}
      open={open}
      type="Collapse"
      duration={TransitionDuration.standard}
      exitDuration={TransitionDuration.standard}
      onExit={useForkCallback(handleExit, onExit)}
      onEnter={useForkCallback(handleEnter, onEnter)}
      onExiting={useForkCallback(handleExiting, onExiting)}
      {...props}
    >
      <div className={styles.Collapse} ref={rootRef}>
        <div className={styles.Wrapper} ref={wrapperRef}>
          <div className={styles.Inner}>{children}</div>
        </div>
      </div>
    </Transition>
  );
});

Collapse.displayName = 'Collapse';

const CSS_HEIGHT_VAR = '--height';
const CSS_HEIGHT_EXIT_VAR = '--height-exit';
