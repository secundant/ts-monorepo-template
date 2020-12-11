import React, { memo } from 'react';
import { Header } from '@app/react-material-ui-kit/Layout/Header';
import { Typography } from '@material-ui/core';
import { useRequiredContext } from '@app/react-shared/hooks/useRequiredContext';
import { LayoutNavigationContext } from '@app/react-nextjs/contexts/Layout/Navigation';

export const LayoutHeader = memo(() => {
  const { toggle } = useRequiredContext(LayoutNavigationContext);

  return (
    <Header onIndentToggle={toggle}>
      <Typography variant="h6" noWrap>
        Example title
      </Typography>
    </Header>
  );
});

LayoutHeader.displayName = 'LayoutHeader';
