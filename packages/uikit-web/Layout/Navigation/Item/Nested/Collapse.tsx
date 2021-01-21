import React, { memo, useCallback, useContext } from 'react';
import { NestedNavItemProps } from '@my-project/uikit-web/Layout/Navigation/Item/Nested/types';
import { Collapse, List } from '@material-ui/core';
import { useControlledState } from '@my-project/shared/hooks/useControlledState';
import { NavItem } from '@my-project/uikit-web/Layout/Navigation/Item/Item';
import { KeyboardArrowDown } from '@material-ui/icons';
import { ArrowIconContainer } from '@my-project/uikit-web/Layout/Navigation/Item/Nested/styled';
import { NestedNavigationItemsContext } from '@my-project/uikit-web/Layout/Navigation/Item/NestedContext';

export const NestedItemCollapse = memo(
  ({
    children,
    open: openFromProps,
    initialOpen = false,
    onChange,
    ...props
  }: NestedNavItemProps) => {
    const { depth } = useContext(NestedNavigationItemsContext);
    const [open, setOpen] = useControlledState({
      initialValue: initialOpen,
      onChange,
      value: openFromProps
    });

    const handleClick = useCallback(() => setOpen(prev => !prev), [setOpen]);

    return (
      <>
        <NavItem
          onClick={handleClick}
          endIcon={
            <ArrowIconContainer open={open}>
              <KeyboardArrowDown />
            </ArrowIconContainer>
          }
          {...props}
        />
        <NestedNavigationItemsContext.Provider
          value={{
            nestedStrategy: 'collapse',
            depth: depth + 1
          }}
        >
          <Collapse in={open}>
            <List>{children}</List>
          </Collapse>
        </NestedNavigationItemsContext.Provider>
      </>
    );
  }
);

NestedItemCollapse.displayName = 'NestedItemCollapse';
