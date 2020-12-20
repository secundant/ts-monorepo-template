import { IUIKitTheme } from '@app/react-material-ui-kit/theme/IUIKitTheme';
import { createMuiTheme } from '@material-ui/core';

// eslint-disable-next-line
export interface ITheme extends IUIKitTheme {}
export interface IThemeCreator {
  (options: IThemeCreatorOptions): ITheme;
}

export interface IThemeCreatorOptions {
  createMui: MuiThemeCreator;
}

export type MuiThemeCreator = typeof createMuiTheme;
