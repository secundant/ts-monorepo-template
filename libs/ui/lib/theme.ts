import { CSSProperties } from 'react';

export const getColorVariable = (color: string) => `var(--palette-${color})`;
export const mergeStyle = (
  ...styles: Array<CSSProperties | CustomCSSProperties | void | null>
): CSSProperties => Object.assign({}, ...styles);

export interface CustomCSSProperties extends CSSProperties {
  [key: `--${string}`]: string | number | null | void;
}
