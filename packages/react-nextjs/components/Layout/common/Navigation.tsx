import React, { memo, ReactNode } from 'react';
import { Drawer, useMediaQuery } from '@material-ui/core';
import styled, { css, useTheme } from 'styled-components';

export interface NavigationProps {
  children: ReactNode;
  onClose?(): void;
  open?: boolean;
}

export const Navigation = memo(({ open, onClose, children }: NavigationProps) => {
  const theme = useTheme();
  const screenIsSmall = useMediaQuery(theme.mui.breakpoints.down('sm'));

  return (
    <StyledDrawer open={open} onClose={onClose} variant={screenIsSmall ? 'temporary' : 'permanent'}>
      {children}
    </StyledDrawer>
  );
});

Navigation.displayName = 'Navigation';

const StyledDrawer = styled(Drawer)`
  ${({ theme }) => theme.mui.breakpoints.down('md')} {
    &,
    & > .MuiPaper-root {
      transition: width 250ms;
      width: 300px;
    }
  }

  ${({ theme }) => theme.mui.breakpoints.up('md')} {
    &,
    & > .MuiPaper-root {
      ${({ open }) => css`
        transition: width 250ms;
        width: ${open ? 300 : 60}px;
      `}
    }
  }

  white-space: nowrap;
  flex-shrink: 0;

  a {
    text-decoration: none;
    color: inherit;
  }
`;
