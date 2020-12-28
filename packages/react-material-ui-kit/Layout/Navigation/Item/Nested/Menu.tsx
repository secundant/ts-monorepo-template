import React, { memo } from 'react';
import { NestedNavItemProps } from '@app/react-material-ui-kit/Layout/Navigation/Item/Nested/types';
import { List, Popover } from '@material-ui/core';
import { NavItem } from '@app/react-material-ui-kit/Layout/Navigation/Item/Item';
import { bindHover, bindPopover } from 'material-ui-popup-state';
import { usePopupState } from 'material-ui-popup-state/hooks';
import { NestedNavigationItemsContext } from '@app/react-material-ui-kit/Layout/Navigation/Item/NestedContext';
import { KeyboardArrowRight } from '@material-ui/icons';

export const NestedItemMenu = memo(({ name, children, ...props }: NestedNavItemProps) => {
  const state = usePopupState({
    variant: 'popover',
    popupId: name,
    disableAutoFocus: false
  });

  return (
    <>
      <NavItem {...bindHover(state)} {...props} endIcon={<KeyboardArrowRight />} />
      <NestedNavigationItemsContext.Provider
        value={{
          nestedStrategy: 'menu',
          depth: 0
        }}
      >
        <Popover
          {...bindPopover(state)}
          PaperProps={{
            onMouseLeave: state.close
          }}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center'
          }}
        >
          <List>{children}</List>
        </Popover>
      </NestedNavigationItemsContext.Provider>
    </>
  );
});

NestedItemMenu.displayName = 'NestedItemMenu';
