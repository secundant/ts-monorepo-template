import React, { memo, useContext } from 'react';
import { NestedNavigationItemsContext } from '@my-project/uikit-web/Layout/Navigation/Item/NestedContext';
import { NestedItemCollapse } from '@my-project/uikit-web/Layout/Navigation/Item/Nested/Collapse';
import { NestedItemMenu } from '@my-project/uikit-web/Layout/Navigation/Item/Nested/Menu';
import { NestedNavItemProps } from '@my-project/uikit-web/Layout/Navigation/Item/Nested/types';

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
