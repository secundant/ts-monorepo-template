import React, { memo } from 'react';
import { NavLinkItem } from '@app/react-nextjs/components/common/Layout/common/NavLinkItem';
import { Navigation } from '@app/react-material-ui-kit/Layout/Navigation';
import { Search } from '@material-ui/icons';
import { useRequiredContext } from '@app/react-shared/hooks/useRequiredContext';
import { LayoutNavigationContext } from '@app/react-nextjs/contexts/Layout/Navigation';
import { CuteLama, Vinicunca } from '@app/icons';

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
