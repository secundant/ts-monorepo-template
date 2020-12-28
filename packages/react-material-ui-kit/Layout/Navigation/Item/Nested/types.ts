import { ReactNode } from 'react';
import { NavItemProps } from '@app/react-material-ui-kit/Layout/Navigation/Item/Item';

export interface NestedNavItemProps extends Omit<NavItemProps, 'endAction' | 'endIcon'> {
  name: string;
  children: ReactNode;
  initialOpen?: boolean;
  onChange?(open: boolean): void;
  open?: boolean;
}
