import React, { memo, useContext } from 'react';
import { NestedNavigationItemsContext } from '@app/react-material-ui-kit/Layout/Navigation/Item/NestedContext';
import { NestedItemCollapse } from '@app/react-material-ui-kit/Layout/Navigation/Item/Nested/Collapse';
import { NestedItemMenu } from '@app/react-material-ui-kit/Layout/Navigation/Item/Nested/Menu';
import { NestedNavItemProps } from '@app/react-material-ui-kit/Layout/Navigation/Item/Nested/types';

export const NestedNavItem = memo((props: NestedNavItemProps) => {
  const { nestedStrategy } = useContext(NestedNavigationItemsContext);
  const Component = ComponentByStrategy[nestedStrategy];

  return <Component {...props} />;
});

NestedNavItem.displayName = 'NestedNavItem';

const ComponentByStrategy = {
  collapse: NestedItemCollapse,
  menu: NestedItemMenu
};
