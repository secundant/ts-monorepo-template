import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { Header as HeaderComponent, HeaderProps } from '@my-project/uikit-web/Layout/Header';
import { Text } from '@my-project/uikit-web/Typography';

export default {
  title: 'UIKit/Layout/Header',
  component: HeaderComponent,
  parameters: {
    layout: 'padded'
  }
} as Meta;

export const Header: Story<HeaderProps> = args => (
  <HeaderComponent {...args}>
    <Text type="h5">Header title</Text>
  </HeaderComponent>
);

Header.args = {};
