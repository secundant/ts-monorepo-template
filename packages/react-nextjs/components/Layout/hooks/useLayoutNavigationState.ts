import { useObjectState } from '@app/react-shared/hooks/useObjectState';
import { useMemo } from 'react';

export interface LayoutNavigationState {
  open: boolean;
}

export interface LayoutNavigationStateActions {
  toggle(): void;
  close(): void;
  open(): void;
}

export function useLayoutNavigationState(): [LayoutNavigationState, LayoutNavigationStateActions] {
  const [state, setState] = useObjectState({
    open: true
  });
  const methods = useMemo<LayoutNavigationStateActions>(
    () => ({
      open() {
        setState({ open: true });
      },
      close() {
        setState({ open: false });
      },
      toggle() {
        setState(prev => ({
          open: !prev.open
        }));
      }
    }),
    [setState]
  );

  return [state, methods];
}
