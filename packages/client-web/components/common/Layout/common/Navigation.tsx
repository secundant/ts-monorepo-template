import React, { memo } from 'react';
import { NavLinkItem } from '@my-project/client-web/components/common/Layout/common/NavLinkItem';
import { Navigation } from '@my-project/uikit-web/Layout/Navigation';
import { Search } from '@material-ui/icons';
import { useRequiredContext } from '@my-project/shared/hooks/useRequiredContext';
import { LayoutNavigationContext } from '@my-project/client-web/contexts/Layout/Navigation';
import { CuteLama, Vinicunca } from '@my-project/icons';

export const LayoutNavigation = memo(() => {
  const { isOpen, close } = useRequiredContext(LayoutNavigationContext);

  return (
    <Navigation
      open={isOpen}
      onClose={close}
      items={
        <>
          <NavLinkItem label="Home" href="/" startIcon={<CuteLama />} />
          <NavLinkItem label="Other" href="/other" startIcon={<Vinicunca />} />
          <NavLinkItem
            label="Google"
            description="External link"
            href="https://google.com"
            startIcon={<Search />}
          />
        </>
      }
    />
  );
});

LayoutNavigation.displayName = 'LayoutNavigation';
