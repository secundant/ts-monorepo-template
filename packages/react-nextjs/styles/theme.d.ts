import { Theme } from '@material-ui/core';

declare module 'styled-components' {
  // eslint-disable-next-line
  interface DefaultTheme {
    mui: Theme;
  }
}
