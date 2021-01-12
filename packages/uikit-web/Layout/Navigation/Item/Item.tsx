import React, { HTMLAttributes, memo, ReactElement, ReactNode, useContext } from 'react';
import {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText
} from '@material-ui/core';
import styled from 'styled-components';
import { NestedNavigationItemsContext } from '@my-project/uikit-web/Layout/Navigation/Item/NestedContext';

export interface NavItemProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'onClick' | 'onMouseEnter'> {
  startAvatar?: ReactElement;
  startIcon?: ReactNode;
  endAction?: ReactNode;
  endIcon?: ReactNode;
  label?: ReactNode;
  description?: ReactNode;
  className?: string;
  inset?: boolean;
}

export const NavItem = memo(
  ({
    startAvatar,
    startIcon,
    endIcon,
    endAction,
    description,
    label,
    inset,
    ...props
  }: NavItemProps) => {
    const { depth } = useContext(NestedNavigationItemsContext);

    return (
      <StyledListItem depth={depth} button={true} {...props}>
        {startIcon && <ListItemIcon>{startIcon}</ListItemIcon>}
        {startAvatar && <ListItemAvatar>{startAvatar}</ListItemAvatar>}
        <ListItemText inset={inset} primary={label} secondary={description} />
        {endIcon && <StyledListItemEndIcon>{endIcon}</StyledListItemEndIcon>}
        {endAction && <ListItemSecondaryAction>{endAction}</ListItemSecondaryAction>}
      </StyledListItem>
    );
  }
);

NavItem.displayName = 'NavItem';

const StyledListItem = styled(ListItem).withConfig<{
  depth: number;
}>({
  shouldForwardProp: prop => prop !== 'depth'
})`
  padding-left: ${p => p.theme.mui.spacing(2 + p.depth * 2)}px;
`;

const StyledListItemEndIcon = styled(ListItemIcon)`
  > * {
    margin-left: auto;
  }
`;
