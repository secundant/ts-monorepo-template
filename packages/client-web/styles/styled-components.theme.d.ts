import { ITheme } from '@my-project/client-web/styles/ITheme';

declare module 'styled-components' {
  // eslint-disable-next-line
  interface DefaultTheme extends ITheme {}
}
