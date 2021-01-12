import React, { ReactNode } from 'react';
import { LayoutRoot, PageBody } from '@my-project/uikit-web/Layout/styled';
import { LayoutHeader } from '@my-project/client-web/components/common/Layout/common/Header';
import { LayoutNavigation } from '@my-project/client-web/components/common/Layout/common/Navigation';

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
