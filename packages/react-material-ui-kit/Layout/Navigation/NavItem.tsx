import {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText
} from '@material-ui/core';
import React, { HTMLAttributes, memo, ReactElement, ReactNode } from 'react';

export interface NavItemProps extends HTMLAttributes<HTMLDivElement> {
  startAvatar?: ReactElement;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  endAction?: ReactNode;
  label?: ReactNode;
  description?: ReactNode;
}

export const NavItem = memo(
  ({ startAvatar, startIcon, endIcon, endAction, description, label, ...props }: NavItemProps) => {
    return (
      <ListItem button={true} {...props}>
        {startIcon && <ListItemIcon>{startIcon}</ListItemIcon>}
        {startAvatar && <ListItemAvatar>{startAvatar}</ListItemAvatar>}
        <ListItemText primary={label} secondary={description} />
        {endIcon}
        {endAction && <ListItemSecondaryAction>{endAction}</ListItemSecondaryAction>}
      </ListItem>
    );
  }
);

NavItem.displayName = 'NavItem';
