import { createContext } from 'react';

export interface INestedNavigationItemsContext {
  nestedStrategy: 'menu' | 'collapse';
  depth: number;
}

export const NestedNavigationItemsContext = createContext<INestedNavigationItemsContext>({
  nestedStrategy: 'collapse',
  depth: 0
});
