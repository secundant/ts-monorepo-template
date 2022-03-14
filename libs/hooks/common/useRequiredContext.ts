import { Context, useContext } from 'react';

export function useRequiredContext<T>(context: Context<T | null>): T {
  const contextValue = useContext(context);

  if (!contextValue) {
    throw new Error(`Context "${context.displayName ?? 'unnamed'}" is not defined`);
  }
  return contextValue;
}
