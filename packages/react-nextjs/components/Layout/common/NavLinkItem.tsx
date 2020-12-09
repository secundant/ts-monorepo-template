import React, { memo } from 'react';
import { NavItem, NavItemProps } from '@app/react-material-ui-kit/Layout/Navigation/NavItem';
import Link from 'next/link';
import styled from 'styled-components';

export interface NavLinkItemProps extends NavItemProps {
  href: string;
}

export const NavLinkItem = memo(({ href, ...props }: NavLinkItemProps) => {
  return (
    <Link href={href}>
      <Anchor>
        <NavItem {...props} />
      </Anchor>
    </Link>
  );
});

NavLinkItem.displayName = 'NavLinkItem';

const Anchor = styled.a`
  white-space: nowrap;
`;
