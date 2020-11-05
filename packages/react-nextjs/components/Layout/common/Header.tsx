import React, { memo, ReactNode } from 'react';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import styled from 'styled-components';
import { Menu } from '@material-ui/icons';

export interface HeaderProps extends HeaderStyledProps {
  onIndentToggle(): void;
  children: ReactNode;
}

export interface HeaderStyledProps {
  indentLeft?: boolean;
}

export const Header = memo(({ indentLeft, onIndentToggle, children }: HeaderProps) => (
  <>
    <StyledAppBar indentLeft={indentLeft} position="fixed">
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

const StyledAppBar = styled(AppBar).withConfig<HeaderStyledProps>({
  shouldForwardProp: prop => prop !== 'indentLeft'
})`
  ${({ theme }) => theme.mui.breakpoints.up('md')} {
    transition: padding-left 250ms;
    padding-left: ${({ indentLeft }) => (indentLeft ? 300 : 60)}px;
  }
`;
