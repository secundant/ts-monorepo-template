import clsx from 'clsx';
import {
  ComponentType,
  createElement,
  ForwardedRef,
  forwardRef,
  ReactNode,
  Ref,
  SVGProps
} from 'react';

export interface SvgIconProps
  extends Pick<SVGProps<SVGSVGElement>, 'viewBox' | 'className' | 'children' | 'style'> {
  titleAccess?: string;
  htmlColor?: string;
  fontSize?: string | number;
  svgRef?: Ref<SVGSVGElement>;
  color?: string; // TODO
}

/**
 * Component creator for internal usage
 * @param rawName
 * @param viewBox
 * @param children
 */
export function createSvgIcon(
  rawName: string,
  viewBox: string,
  ...children: ReactNode[]
): ComponentType<SvgIconProps> {
  const IconComponent = forwardRef((props: SvgIconProps, ref: ForwardedRef<SVGSVGElement>) =>
    createElement(SvgIcon, { ...props, viewBox, svgRef: ref }, ...children)
  );

  IconComponent.displayName = `${rawName.replace(/(^Svg|Icon$)/g, '')}Icon`;
  return IconComponent;
}

export function SvgIcon({
  titleAccess,
  color,
  fontSize,
  htmlColor,
  className,
  children,
  style,
  viewBox,
  svgRef
}: SvgIconProps) {
  return (
    <svg
      className={clsx(
        'select-none transition-[fill] fill-current w-[1em] h-[1em] inline-block text-inherit',
        className
      )}
      ref={svgRef}
      viewBox={viewBox}
      focusable="false"
      color={htmlColor}
      aria-hidden={titleAccess ? undefined : true}
      role={titleAccess ? 'img' : undefined}
      style={{
        ...style,
        ...(fontSize ? { fontSize } : {}),
        ...(color ? { color } : {})
      }}
    >
      {children}
      {titleAccess && <title>{titleAccess}</title>}
    </svg>
  );
}
