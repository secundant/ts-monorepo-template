import { IUIKitTheme } from '@app/react-material-ui-kit/theme/IUIKitTheme';

declare module 'styled-components' {
  // eslint-disable-next-line
  interface DefaultTheme extends IUIKitTheme {}
}
