export interface UIPalette {
  white: string;
  black: string;

  primary: UIRegularColor;
  secondary: UIRegularColor;

  error: UIRegularColor;
  warning: UIRegularColor;
  success: UIRegularColor;
}

export interface UIRegularColor {
  main: string;
  dark: string;
  light: string;
}

export interface UITextColor {
  body: string;
  label: string;
}

export interface UIGradientColor {
  '50': string;
  '100': string;
  '200': string;
  '300': string;
  '400': string;
  '500': string;
  '600': string;
  '700': string;
  '800': string;
  '900': string;
}
