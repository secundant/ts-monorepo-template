import { IUIKitTheme } from '@my-project/uikit-web/theme/IUIKitTheme';

declare module 'styled-components' {
  // eslint-disable-next-line
  interface DefaultTheme extends IUIKitTheme {}
}
