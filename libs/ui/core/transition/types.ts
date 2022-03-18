import { TimeoutProps } from 'react-transition-group/Transition';

export type SharedTransitionProps<Ref extends HTMLElement> = Omit<
  TimeoutProps<Ref>,
  'children' | 'timeout' | 'addEndListener'
>;
