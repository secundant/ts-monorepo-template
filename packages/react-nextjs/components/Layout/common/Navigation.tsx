import React, { memo } from 'react';
import { useLayoutNavigationState } from '@app/react-nextjs/components/Layout/hooks/useLayoutNavigationState';
import { NavLinkItem } from '@app/react-nextjs/components/Layout/common/NavLinkItem';
import { Navigation } from '@app/react-material-ui-kit/Layout/Navigation';
import { DirectionsCar, Home, Search } from '@material-ui/icons';

export const LayoutNavigation = memo(() => {
  const [{ open }, { close }] = useLayoutNavigationState();

  return (
    <Navigation
      open={open}
      onClose={close}
      items={
        <>
          <NavLinkItem label="Home" href="/" startIcon={<Home />} />
          <NavLinkItem label="Other" href="/other" startIcon={<DirectionsCar />} />
          <NavLinkItem label="Google" href="https://google.com" startIcon={<Search />} />
        </>
      }
    />
  );
});

LayoutNavigation.displayName = 'LayoutNavigation';
