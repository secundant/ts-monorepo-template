import { createGlobalStyle } from 'styled-components';
import React from 'react';
import { ThemeProvider } from '@app/react-nextjs/styles/ThemeProvider';
import { CssBaseline } from '@material-ui/core';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'padded'
};

export const decorators = [
  Story => (
    <ThemeProvider
      themeOptions={{
        deviceType: 'desktop'
      }}
    >
      <CssBaseline />
      <StorybookGlobalStyles />
      <Story />
    </ThemeProvider>
  )
];

const StorybookGlobalStyles = createGlobalStyle`
  body {
    box-sizing: border-box;
  }
`;
