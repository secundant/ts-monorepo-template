import React from 'react';
import { ThemeProvider } from '@my-project/client-web/styles/ThemeProvider';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' }
};

export const decorators = [
  (Story, ctx) => (
    <ThemeProvider
      themeOptions={{
        deviceType: 'desktop'
      }}
    >
      <Story {...ctx} />
    </ThemeProvider>
  )
];

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Theme from main app',
    defaultValue: 'default',
    toolbar: {
      items: ['default']
    }
  }
};
