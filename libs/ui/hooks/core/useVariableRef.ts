import { RefObject, useRef } from 'react';

export function useVariableRef<T>(variable: T): RefObject<T> {
  const ref = useRef(variable);

  ref.current = variable;
  return ref;
}
