import React, { ReactNode } from 'react';
import { LayoutRoot, PageBody } from '@my-project/uikit-web/Layout/styled';
import { LayoutNavigation } from '@my-project/client-web/components/common/Layout/common/Navigation';

export interface NavOnlyLayoutProps {
  children: ReactNode;
}

export function NavOnlyLayout({ children }: NavOnlyLayoutProps) {
  return (
    <LayoutRoot>
      <LayoutNavigation />
      <PageBody>{children}</PageBody>
    </LayoutRoot>
  );
}
