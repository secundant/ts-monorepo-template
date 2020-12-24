import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { Header as UIHeader, HeaderProps } from '@app/react-material-ui-kit/Layout/Header';
import {
  Navigation as UINavigation,
  NavigationProps
} from '@app/react-material-ui-kit/Layout/Navigation';
import { NavItem } from '@app/react-material-ui-kit/Layout/Navigation/NavItem';
import { Home } from '@material-ui/icons';

export default {
  title: 'UIKit/Layout',
  component: UIHeader
} as Meta;

export const Header: Story<HeaderProps> = args => <UIHeader {...args} />;
export const Navigation: Story<NavigationProps> = args => (
  <UINavigation
    {...args}
    items={
      <>
        <NavItem startIcon={<Home />} label="Home" />
      </>
    }
  />
);

Header.args = {};
Navigation.args = {
  open: true
};
