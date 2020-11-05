import React, { memo, ReactNode } from 'react';
import Link from 'next/link';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

export interface LinkItemProps {
  label: ReactNode;
  icon?: ReactNode;
  href: string;
}

export const LinkItem = memo(({ href, icon, label }: LinkItemProps) => (
  <Link href={href}>
    <a>
      <ListItem button>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItem>
    </a>
  </Link>
));

LinkItem.displayName = 'LinkItem';
