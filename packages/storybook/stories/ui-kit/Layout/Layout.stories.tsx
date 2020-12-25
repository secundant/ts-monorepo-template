import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { Header } from '@app/react-material-ui-kit/Layout/Header';
import { Navigation } from '@app/react-material-ui-kit/Layout/Navigation';
import { NavItem } from '@app/react-material-ui-kit/Layout/Navigation/NavItem';
import { Home } from '@material-ui/icons';
import { LayoutRoot, PageBody } from '@app/react-material-ui-kit/Layout/styled';
import { Text } from '@app/react-material-ui-kit/Typography';

export default {
  title: 'UIKit/Layout',
  component: () => null,
  parameters: {
    layout: 'fullscreen'
  }
} as Meta;

export const Layout: Story<{}> = () => (
  <LayoutRoot>
    <Header onIndentToggle={() => console.log('toggled')}>
      <Text type="h5">Layout title</Text>
    </Header>

    <Navigation open items={<NavItem startIcon={<Home />} label="Home" />} />

    <PageBody>
      <Text type="h1" gutterBottom>
        My page
      </Text>
      <Text>With some content</Text>
    </PageBody>
  </LayoutRoot>
);

Layout.args = {};
