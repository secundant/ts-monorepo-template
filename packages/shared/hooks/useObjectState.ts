import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { isFunction } from 'lodash';

export function useObjectState<T extends {}>(
  initialState: T
): [T, Dispatch<SetStateAction<Partial<T>>>] {
  const [state, setState] = useState(initialState);

  const setPartialState = useCallback<Dispatch<SetStateAction<Partial<T>>>>(
    updatesOrCallback =>
      setState(prevState => ({
        ...prevState,
        ...(isFunction(updatesOrCallback) ? updatesOrCallback(prevState) : updatesOrCallback)
      })),
    []
  );

  return [state, setPartialState];
}
