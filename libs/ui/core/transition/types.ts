export type TransitionStatus = 'enter' | 'entered' | 'exit' | 'exited' | 'entering' | 'exiting';
export type TransitionPhaseHandlerName = `on${Capitalize<TransitionStatus>}`;

export type TransitionPhaseHandlers = Partial<Record<TransitionPhaseHandlerName, () => void>>;

export interface TransitionOptions extends TransitionPhaseHandlers {
  open?: boolean;
  duration?: number;
  exitDuration?: number;
}
