import { ITheme } from '@app/react-nextjs/styles/ITheme';

declare module 'styled-components' {
  // eslint-disable-next-line
  interface DefaultTheme extends ITheme {}
}
