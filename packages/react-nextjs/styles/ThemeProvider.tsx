import { StylesProvider, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import React, { PropsWithChildren, ReactElement } from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import defaultTheme from '@app/react-nextjs/styles/themes/default';

export function ThemeProvider({ children }: PropsWithChildren<{}>): ReactElement {
  return (
    <MuiThemeProvider theme={defaultTheme.mui}>
      <SCThemeProvider theme={defaultTheme}>
        <StylesProvider injectFirst>{children}</StylesProvider>
      </SCThemeProvider>
    </MuiThemeProvider>
  );
}
