import React, { memo, ReactNode } from 'react';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import styled from 'styled-components';
import { Menu } from '@material-ui/icons';

export interface HeaderProps {
  onIndentToggle(): void;
  children: ReactNode;
}

export const Header = memo(({ onIndentToggle, children }: HeaderProps) => (
  <>
    <StyledAppBar position="sticky">
      <Toolbar>
        <IconButton color="inherit" onClick={onIndentToggle} edge="start">
          <Menu />
        </IconButton>
        {children}
      </Toolbar>
    </StyledAppBar>
  </>
));

Header.displayName = 'Header';

const StyledAppBar = styled(AppBar)`
  grid-area: header;
`;
