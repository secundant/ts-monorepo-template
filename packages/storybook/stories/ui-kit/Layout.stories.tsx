import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { Header as UIHeader, HeaderProps } from '@app/react-material-ui-kit/Layout/Header';
import {
  Navigation as UINavigation,
  NavigationProps
} from '@app/react-material-ui-kit/Layout/Navigation';
import { NavItem } from '@app/react-material-ui-kit/Layout/Navigation/NavItem';
import { Home } from '@material-ui/icons';
import styled from 'styled-components';
import { LayoutRoot, PageBody } from '@app/react-material-ui-kit/Layout/styled';

export default {
  title: 'UIKit/Layout',
  component: LayoutRoot,
  subcomponents: {
    Header: UIHeader,
    Navigation: UINavigation
  }
} as Meta;

export const Layout: Story<{}> = () => (
  <LayoutRoot>
    <UIHeader onIndentToggle={() => console.log('toggled')}>Title</UIHeader>
    <UINavigation
      open
      items={
        <>
          <NavItem startIcon={<Home />} label="Home" />
        </>
      }
    />
    <PageBody>Content</PageBody>
  </LayoutRoot>
);

export const Header: Story<HeaderProps> = args => <UIHeader {...args}>Title</UIHeader>;
export const Navigation: Story<NavigationProps> = args => (
  <FullScreen>
    <UINavigation
      {...args}
      items={
        <>
          <NavItem startIcon={<Home />} label="Home" />
        </>
      }
    />
  </FullScreen>
);

Header.args = {};
Layout.args = {};
Navigation.args = {
  open: true
};

const FullScreen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;

  > * {
    height: 100%;
  }
`;
