import React, { memo } from 'react';
import { Navigation, NavigationProps } from '@app/react-material-ui-kit/Layout/Navigation';
import { NavItem } from '@app/react-material-ui-kit/Layout/Navigation/Item/Item';
import { NestedNavItem } from '@app/react-material-ui-kit/Layout/Navigation/Item/Nested';
import {
  Close,
  Home,
  Label,
  NewReleasesSharp,
  OpenInBrowser,
  Report,
  SupervisedUserCircleSharp,
  VerifiedUser
} from '@material-ui/icons';

export const NavigationStory = memo((props: Partial<NavigationProps>) => (
  <Navigation
    open
    items={
      <>
        <NavItem label="Dashboard" startIcon={<Home />} />
        <NavItem label="Posts" startIcon={<NewReleasesSharp />} />
        <NavItem
          label="Users"
          startIcon={<SupervisedUserCircleSharp />}
          endIcon={<VerifiedUser />}
        />
        <NavItem label="Reports" startIcon={<Report />} description="For month" />
        <NestedNavItem name="labels" label="Labels" startIcon={<Label />}>
          <NavItem label="Closed" startIcon={<Close />} />
          <NavItem label="Opened" startIcon={<OpenInBrowser />} />
          <NestedNavItem name="other" label="Other" inset>
            <NavItem label="Pictures" inset />
            <NavItem label="Animals" inset />
          </NestedNavItem>
        </NestedNavItem>
      </>
    }
    {...props}
  />
));

NavigationStory.displayName = 'NavigationStory';
