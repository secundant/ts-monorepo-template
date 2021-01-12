import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import {
  Navigation as NavigationComponent,
  NavigationProps
} from '@my-project/uikit-web/Layout/Navigation';
import { NavItem } from '@my-project/uikit-web/Layout/Navigation/Item/Item';
import { NavigationStory } from './NavigationStory';

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

export const Navigation: Story<NavigationProps> = args => <NavigationStory {...args} />;

Navigation.args = {
  open: true
};
