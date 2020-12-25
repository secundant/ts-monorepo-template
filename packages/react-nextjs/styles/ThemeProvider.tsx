import {
  createMuiTheme,
  StylesProvider,
  ThemeProvider as MuiThemeProvider
} from '@material-ui/core/styles';
import React, { ReactElement, ReactNode, useMemo } from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import * as process from 'process';
import { makeCreateSsrMuiTheme } from '@app/react-nextjs/styles/utils/createSsrMuiTheme';
import createDefaultTheme from '@app/react-nextjs/styles/themes/default';
import { CssBaseline } from '@material-ui/core';

export interface ThemeProviderProps extends ThemeProviderServerProps {
  children: ReactNode;
}

export interface ThemeProviderServerProps {
  themeOptions: {
    deviceType: ThemeDeviceType;
  };
}

export type ThemeDeviceType = 'mobile' | 'tablet' | 'desktop';

export function ThemeProvider({ children, themeOptions }: ThemeProviderProps): ReactElement {
  const createMuiThemeAdapter = useMemo(
    () => (process.browser ? createMuiTheme : makeCreateSsrMuiTheme(themeOptions.deviceType)),
    [themeOptions.deviceType]
  );

  const theme = useMemo(
    () =>
      createDefaultTheme({
        createMui: createMuiThemeAdapter
      }),
    [createMuiThemeAdapter]
  );

  return (
    <MuiThemeProvider theme={theme.mui}>
      <CssBaseline />
      <SCThemeProvider theme={theme}>
        <StylesProvider injectFirst>{children}</StylesProvider>
      </SCThemeProvider>
    </MuiThemeProvider>
  );
}
