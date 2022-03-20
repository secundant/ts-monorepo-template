import { SvgIcon, SvgIconProps } from './svg-icon';
import { ComponentType, createElement, ForwardedRef, forwardRef, ReactNode } from 'react';

/**
 * Component creator for internal usage
 * @param rawName
 * @param viewBox
 * @param children
 */
export default function createSvgIcon(
  rawName: string,
  viewBox: string,
  ...children: ReactNode[]
): ComponentType<SvgIconProps> {
  const IconComponent = forwardRef((props: SvgIconProps, ref: ForwardedRef<SVGSVGElement>) =>
    createElement(SvgIcon, { ...props, viewBox, ref }, ...children)
  );

  IconComponent.displayName = `${rawName.replace(/^Svg/, '').replace(/Icon$/, '')}Icon`;
  return IconComponent;
}
