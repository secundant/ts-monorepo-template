import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { Header } from '@app/react-material-ui-kit/Layout/Header';
import { LayoutRoot, PageBody } from '@app/react-material-ui-kit/Layout/styled';
import { Text } from '@app/react-material-ui-kit/Typography';
import { NavigationStory } from './NavigationStory';

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

    <NavigationStory />

    <PageBody>
      <Text type="h1" gutterBottom>
        My page
      </Text>
      <Text>With some content</Text>
    </PageBody>
  </LayoutRoot>
);

Layout.args = {};
