import React, { memo } from 'react';
import { Header } from '@app/react-material-ui-kit/Layout/Header';
import { useRequiredContext } from '@app/react-shared/hooks/useRequiredContext';
import { LayoutNavigationContext } from '@app/react-nextjs/contexts/Layout/Navigation';
import { Text } from '@app/react-material-ui-kit/Typography';

export const LayoutHeader = memo(() => {
  const { toggle } = useRequiredContext(LayoutNavigationContext);

  return (
    <Header onIndentToggle={toggle}>
      <Text type="h5">Example title</Text>
    </Header>
  );
});

LayoutHeader.displayName = 'LayoutHeader';
