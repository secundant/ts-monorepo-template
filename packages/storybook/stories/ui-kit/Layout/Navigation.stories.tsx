import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import {
  Navigation as NavigationComponent,
  NavigationProps
} from '@app/react-material-ui-kit/Layout/Navigation';
import { NavItem } from '@app/react-material-ui-kit/Layout/Navigation/NavItem';
import { Home, VerifiedUser } from '@material-ui/icons';

export default {
  title: 'UIKit/Layout/Navigation',
  component: NavigationComponent,
  subcomponents: {
    NavItem
  },
  parameters: {
    layout: 'fullscreen'
  }
} as Meta;

export const Navigation: Story<NavigationProps> = args => (
  <NavigationComponent
    {...args}
    items={
      <>
        <NavItem startIcon={<Home />} label="Dashboard" />
        <NavItem label="Posts" />
        <NavItem label="Users" endIcon={<VerifiedUser />} />
        <NavItem label="Reports" description="For month" />
      </>
    }
  />
);

Navigation.args = {
  open: true
};
