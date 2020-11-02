import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery
} from '@material-ui/core';
import React, { ReactNode, useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { Home, Menu as MenuIcon } from '@material-ui/icons';
import Link from 'next/link';
import useTheme from '@material-ui/core/styles/useTheme';
import { ThemeProvider } from '@app/react-nextjs/styles/ThemeProvider';

export interface ExampleLayoutProps {
  children: ReactNode;
}

export function ExampleLayout({ children }: ExampleLayoutProps) {
  const theme = useTheme();
  const screenIsSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const [opened, setOpened] = useState(false);
  const toggleOpened = useCallback(() => setOpened(prev => !prev), []);
  const handleCloseDrawer = useCallback(() => setOpened(false), []);

  return (
    <ThemeProvider>
      <Root>
        <CssBaseline />
        <StyledAppBar drawerOpened={opened} position="fixed">
          <Toolbar>
            <IconButton color="inherit" onClick={toggleOpened} edge="start">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Example title
            </Typography>
          </Toolbar>
        </StyledAppBar>
        <StyledDrawer
          open={opened}
          onClose={handleCloseDrawer}
          variant={screenIsSmall ? 'temporary' : 'permanent'}
        >
          <Toolbar />
          <Divider />
          <List>
            <Link href="/">
              <a>
                <ListItem button>
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>
              </a>
            </Link>
            <Link href="https://google.com">
              <a>
                <ListItem button>
                  <ListItemText primary="Go to google" />
                </ListItem>
              </a>
            </Link>
          </List>
        </StyledDrawer>
        <Body>
          <Toolbar />
          {children}
        </Body>
      </Root>
    </ThemeProvider>
  );
}

const Root = styled.div`
  display: flex;
  min-height: 100%;
`;

const Body = styled.div`
  flex-grow: 0;
  padding: 24px;
`;

const StyledAppBar = styled(AppBar).withConfig<{
  drawerOpened: boolean;
}>({
  shouldForwardProp: prop => prop !== 'drawerOpened'
})`
  ${({ theme }) => theme.mui.breakpoints.up('md')} {
    transition: padding-left 250ms;
    padding-left: ${({ drawerOpened }) => (drawerOpened ? 300 : 60)}px;
  }
`;

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
