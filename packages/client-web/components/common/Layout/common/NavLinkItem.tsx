import React, { memo } from 'react';
import { NavItem, NavItemProps } from '@my-project/uikit-web/Layout/Navigation/Item/Item';
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
