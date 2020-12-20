import React, { memo, ReactNode } from 'react';
import styled, { useTheme } from 'styled-components';
import { Drawer, useMediaQuery } from '@material-ui/core';

export interface NavigationProps {
  open: boolean;
  onClose?(): void;
  items: ReactNode;
}

export const Navigation = memo(({ open, onClose, items }: NavigationProps) => {
  const theme = useTheme();
  const screenIsSmall = useMediaQuery(theme.mui.breakpoints.down('sm'), {
    noSsr: true
  });

  return (
    <StyledDrawer open={open} onClose={onClose} variant={screenIsSmall ? 'temporary' : 'permanent'}>
      {items}
    </StyledDrawer>
  );
});

Navigation.displayName = 'Navigation';

const StyledDrawer = styled(Drawer)`
  grid-area: navigation;
  flex-shrink: 0;

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
