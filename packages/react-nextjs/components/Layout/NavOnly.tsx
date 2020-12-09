import React, { ReactNode } from 'react';
import { LayoutRoot, PageBody } from '@app/react-material-ui-kit/Layout/styled';
import { LayoutNavigation } from '@app/react-nextjs/components/Layout/common/Navigation';

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
