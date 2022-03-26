import { TransitionDuration } from './constants';
import { TransitionOptions, TransitionStatus } from './types';
import { noop } from '@libs/utils/core';
import { useEffect, useState } from 'react';

export function useTransition({
  open,
  duration = TransitionDuration.enteringScreen,
  exitDuration = TransitionDuration.leavingScreen,

  onExit = noop,
  onEnter = noop,
  onExited = noop,
  onEntered = noop,
  onExiting = noop,
  onEntering = noop
}: TransitionOptions) {
  const [status, setStatus] = useState<TransitionStatus>('exited');

  useEffect(() => {
    const handleStart = open ? onEnter : onExit;
    const handleEnd = open ? onEntered : onExited;
    const phaseDuration = open ? duration : exitDuration;

    if (phaseDuration === 0) {
      handleStart();
      handleEnd();
      setStatus(open ? 'entered' : 'exited');
      return;
    } else {
      handleStart();
      const startTimeout = setTimeout(() => {
        open ? onEntering() : onExiting();
        setStatus(open ? 'entering' : 'exiting');
      }, 10);
      const endTimeout = setTimeout(() => {
        clearTimeout(startTimeout);
        handleEnd();
        setStatus(open ? 'entered' : 'exited');
      }, phaseDuration);

      return () => {
        clearTimeout(startTimeout);
        clearTimeout(endTimeout);
      };
    }
  }, [open]);

  return {
    status
  };
}
