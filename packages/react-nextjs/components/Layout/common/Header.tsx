import React, { memo } from 'react';
import { useLayoutNavigationState } from '@app/react-nextjs/components/Layout/hooks/useLayoutNavigationState';
import { Header } from '@app/react-material-ui-kit/Layout/Header';
import { Typography } from '@material-ui/core';

export const LayoutHeader = memo(() => {
  const [, { toggle }] = useLayoutNavigationState();

  return (
    <Header onIndentToggle={toggle}>
      <Typography variant="h6" noWrap>
        Example title
      </Typography>
    </Header>
  );
});

LayoutHeader.displayName = 'LayoutHeader';
