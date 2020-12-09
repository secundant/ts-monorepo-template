import React, { ReactNode } from 'react';
import { LayoutRoot, PageBody } from '@app/react-material-ui-kit/Layout/styled';
import { LayoutHeader } from '@app/react-nextjs/components/Layout/common/Header';
import { LayoutNavigation } from '@app/react-nextjs/components/Layout/common/Navigation';

export interface FullLayoutProps {
  children: ReactNode;
}

export function FullLayout({ children }: FullLayoutProps) {
  return (
    <LayoutRoot>
      <LayoutHeader />
      <LayoutNavigation />
      <PageBody>{children}</PageBody>
    </LayoutRoot>
  );
}
