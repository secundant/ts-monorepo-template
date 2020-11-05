import { Toolbar, Typography } from '@material-ui/core';
import React, { ReactNode, useCallback, useState } from 'react';
import styled from 'styled-components';
import { Home, Search } from '@material-ui/icons';
import { Header } from '@app/react-nextjs/components/Layout/common/Header';
import { Navigation } from '@app/react-nextjs/components/Layout/common/Navigation';
import { LinkItem } from '@app/react-nextjs/components/Layout/common/LinkItem';

export interface FullLayoutProps {
  children: ReactNode;
}

export function FullLayout({ children }: FullLayoutProps) {
  const [opened, setOpened] = useState(false);
  const handleHeaderIndentChange = useCallback(() => setOpened(prev => !prev), []);
  const handleNavigationClose = useCallback(() => setOpened(false), []);

  return (
    <Root>
      <Header onIndentToggle={handleHeaderIndentChange} indentLeft={opened}>
        <Typography variant="h6" noWrap>
          Example title
        </Typography>
      </Header>

      <Navigation open={opened} onClose={handleNavigationClose}>
        <LinkItem label="Home" href="/other" icon={<Home />} />
        <LinkItem label="Google" href="https://google.com" icon={<Search />} />
      </Navigation>

      <Body>
        <Toolbar />
        {children}
      </Body>
    </Root>
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
