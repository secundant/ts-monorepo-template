import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { Text, TextProps } from '@app/react-material-ui-kit/Typography';
import { Grid } from '@material-ui/core';

export default {
  title: 'UIKit/Typography',
  component: Text,
  parameters: {
    layout: 'padded'
  }
} as Meta;

export const Typography: Story<TextProps> = args => (
  <Grid container spacing={2}>
    <Grid item xs={6}>
      <Text {...args}>Dynamic</Text>
    </Grid>
    <Grid item xs={6}>
      <Text {...args} type="h1">
        Heading 1
      </Text>
      <Text {...args} type="h2">
        Heading 2
      </Text>
      <Text {...args} type="h3">
        Heading 3
      </Text>
      <Text {...args} type="h4">
        Heading 4
      </Text>
      <Text {...args} type="h5">
        Heading 5
      </Text>
      <Text {...args} type="body1">
        Body 1
      </Text>
      <Text {...args} type="body2">
        Body 2
      </Text>
    </Grid>
  </Grid>
);

Typography.args = {};
