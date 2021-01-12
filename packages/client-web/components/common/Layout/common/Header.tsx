import React, { memo } from 'react';
import { Header } from '@my-project/uikit-web/Layout/Header';
import { useRequiredContext } from '@my-project/shared/hooks/useRequiredContext';
import { LayoutNavigationContext } from '@my-project/client-web/contexts/Layout/Navigation';
import { Text } from '@my-project/uikit-web/Typography';

export const LayoutHeader = memo(() => {
  const { toggle } = useRequiredContext(LayoutNavigationContext);

  return (
    <Header onIndentToggle={toggle}>
      <Text type="h5">Example title</Text>
    </Header>
  );
});

LayoutHeader.displayName = 'LayoutHeader';
