import clsx from 'clsx';
import { ForwardedRef, forwardRef, SVGProps } from 'react';

export interface SvgIconProps
  extends Pick<SVGProps<SVGSVGElement>, 'viewBox' | 'className' | 'children' | 'style'> {
  titleAccess?: string;
  htmlColor?: string;
  fontSize?: string | number;
  color?: string; // TODO
}

export const SvgIcon = forwardRef(
  (
    { titleAccess, color, fontSize, htmlColor, className, children, style, viewBox }: SvgIconProps,
    ref: ForwardedRef<SVGSVGElement>
  ) => {
    return (
      <svg
        className={clsx(
          'select-none transition-[fill] fill-current w-[1em] h-[1em] inline-block text-inherit',
          className
        )}
        ref={ref}
        viewBox={viewBox}
        focusable="false"
        color={htmlColor}
        aria-hidden={titleAccess ? undefined : true}
        role={titleAccess ? 'img' : undefined}
        style={{
          ...(fontSize ? { fontSize } : {}),
          ...style,
          ...(color ? { color } : {})
        }}
      >
        {children}
        {titleAccess && <title>{titleAccess}</title>}
      </svg>
    );
  }
);

SvgIcon.displayName = 'SvgIcon';
