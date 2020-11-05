import React, { ReactNode, useCallback, useState } from 'react';
import styled from 'styled-components';
import { Home, Search } from '@material-ui/icons';
import { Navigation } from '@app/react-nextjs/components/Layout/common/Navigation';
import { LinkItem } from '@app/react-nextjs/components/Layout/common/LinkItem';

export interface NavOnlyLayoutProps {
  children: ReactNode;
}

export function NavOnlyLayout({ children }: NavOnlyLayoutProps) {
  const [opened, setOpened] = useState(false);
  const handleNavigationClose = useCallback(() => setOpened(false), []);

  return (
    <Root>
      <Navigation open={opened} onClose={handleNavigationClose}>
        <LinkItem label="Home" href="/" icon={<Home />} />
        <LinkItem label="Google" href="https://google.com" icon={<Search />} />
      </Navigation>

      <Body>{children}</Body>
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
