import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { isFunction } from 'lodash';

export interface ControlledStateOptions<T> {
  initialValue: T;
  onChange?(value: T): void;
  value?: T;
}

export function useControlledState<T>({
  initialValue,
  onChange,
  value: valueFromOptions
}: ControlledStateOptions<T>): [T, Dispatch<SetStateAction<T>>] {
  const [valueFromState, setValue] = useState(initialValue);
  const value = valueFromOptions ?? valueFromState;

  const setStateAndFireChange = useCallback<Dispatch<SetStateAction<T>>>(
    nextValueOrFn => {
      const nextValue: T = isFunction(nextValueOrFn) ? nextValueOrFn(value) : nextValueOrFn;

      if (nextValue !== value) {
        setValue(nextValue);
        if (onChange) {
          onChange(nextValue);
        }
      }
    },
    [onChange, value]
  );

  return [value, setStateAndFireChange];
}
