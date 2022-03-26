import { Nil } from '../../types';
import { useVariableRef } from './useVariableRef';
import { useCallback } from 'react';

export function useForkCallback<Args extends any[]>(
  callbackA: ((...args: Args) => any) | Nil,
  callbackB: ((...args: Args) => any) | Nil
): ((...args: Args) => any) | undefined {
  const callbacksRef = useVariableRef({ callbackA, callbackB });

  return useCallback((...args: Args) => {
    if (callbacksRef.current?.callbackA) callbacksRef.current.callbackA(...args);
    if (callbacksRef.current?.callbackB) callbacksRef.current.callbackB(...args);
  }, []);
}
