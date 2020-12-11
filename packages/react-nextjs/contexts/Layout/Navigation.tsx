import React, { createContext, memo, useDebugValue, useMemo, useState } from 'react';

export interface ILayoutNavigationContext {
  isOpen: boolean;
  open(): void;
  close(): void;
  toggle(): void;
}

export const LayoutNavigationContext = createContext<ILayoutNavigationContext | null>(null);

LayoutNavigationContext.displayName = 'LayoutNavigationContext';

export const LayoutNavigationProvider = memo(({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const methods = useMemo(
    () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen(prev => !prev)
    }),
    []
  );

  const context = useMemo<ILayoutNavigationContext>(
    () => ({
      isOpen,
      ...methods
    }),
    [isOpen]
  );

  useDebugValue(context);

  return (
    <LayoutNavigationContext.Provider value={context}>{children}</LayoutNavigationContext.Provider>
  );
});

LayoutNavigationProvider.displayName = 'LayoutNavigationProvider';
