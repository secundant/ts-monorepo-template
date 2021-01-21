import { ReactNode } from 'react';
import { NavItemProps } from '@my-project/uikit-web/Layout/Navigation/Item/Item';

export interface NestedNavItemProps extends Omit<NavItemProps, 'endAction' | 'endIcon'> {
  name: string;
  children: ReactNode;
  initialOpen?: boolean;
  onChange?(open: boolean): void;
  open?: boolean;
}
