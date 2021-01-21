import React, { memo, ReactNode, useMemo } from 'react';
import styled, { useTheme } from 'styled-components';
import { Drawer, List, useMediaQuery } from '@material-ui/core';
import {
  INestedNavigationItemsContext,
  NestedNavigationItemsContext
} from '@my-project/uikit-web/Layout/Navigation/Item/NestedContext';

export interface NavigationProps {
  open: boolean;
  onClose?(): void;
  items: ReactNode;
}

export const Navigation = memo(({ open, onClose, items }: NavigationProps) => {
  const theme = useTheme();
  const screenIsSmallDown = useMediaQuery(theme.mui.breakpoints.down('sm'), {
    noSsr: true
  });
  const screenIsMedium = useMediaQuery(theme.mui.breakpoints.between('md', 'md'), {
    noSsr: true
  });

  const contextValue = useMemo<INestedNavigationItemsContext>(
    () => ({
      nestedStrategy: screenIsMedium || !open ? 'menu' : 'collapse',
      depth: 0
    }),
    [screenIsMedium, open]
  );

  return (
    <StyledDrawer
      open={open && !screenIsMedium}
      onClose={onClose}
      variant={screenIsSmallDown ? 'temporary' : 'permanent'}
    >
      <NestedNavigationItemsContext.Provider value={contextValue}>
        <List>{items}</List>
      </NestedNavigationItemsContext.Provider>
    </StyledDrawer>
  );
});

Navigation.displayName = 'Navigation';

const StyledDrawer = styled(Drawer)`
  grid-area: navigation;
  flex-shrink: 0;
  height: 100vh;

  position: sticky;
  top: 0;
  left: 0;

  & > .MuiPaper-root {
    position: static;
  }

  &,
  & > .MuiPaper-root {
    transition: width 250ms;
    width: 300px;
  }

  ${({ theme }) => theme.mui.breakpoints.up('md')} {
    &,
    & > .MuiPaper-root {
      width: ${({ open }) => (open ? 300 : 60)}px;
    }
  }
`;
