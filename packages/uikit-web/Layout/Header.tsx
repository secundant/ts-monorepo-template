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
        <StyledMenuIconButton
          color="inherit"
          onClick={onIndentToggle}
          edge="start"
          aria-label="Toggle navigation"
        >
          <Menu />
        </StyledMenuIconButton>
        {children}
      </Toolbar>
    </StyledAppBar>
  </>
));

Header.displayName = 'Header';

const StyledAppBar = styled(AppBar)`
  grid-area: header;
`;

const StyledMenuIconButton = styled(IconButton)`
  margin-right: 8px;
`;
