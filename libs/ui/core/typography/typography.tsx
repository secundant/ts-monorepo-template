import { HTMLElementType, PolymorphicProps, PropsOf } from '../../types';
import clsx from 'clsx';
import { ElementType, ReactNode } from 'react';

export interface TypographyProps {
  className?: string;
  children: NonNullable<ReactNode>;
  type?: TypographyType;
}

export type TypographyType = 'label' | 'body' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type TypographyPolymorphicProps<C extends ElementType> = PolymorphicProps<
  C,
  TypographyProps
>;

export function Typography<C extends ElementType = 'span'>({
  children,
  className,
  type = 'body',
  as: Component = ElementsTypes[type] as C,
  ...props
}: TypographyPolymorphicProps<C>) {
  return (
    <Component className={clsx(ClassNames[type], className)} {...(props as PropsOf<C>)}>
      {children}
    </Component>
  );
}

const ElementsTypes: Record<TypographyType, HTMLElementType> = {
  label: 'label',
  body: 'span',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6'
};

const ClassNames: Record<TypographyType, string> = {
  label: 'text-base font-medium leading-normal tracking-[0.4px] text-ui-label mb-2',
  body: 'text-sm font-normal text-black',
  h1: 'text-9xl font-extralight text-black mb-12',
  h2: 'text-8xl font-extralight text-black mb-8',
  h3: 'text-7xl font-normal text-black mb-6',
  h4: 'text-5xl font-normal text-black mb-4',
  h5: 'text-3xl font-normal text-black mb-4',
  h6: 'text-xl font-bold text-gray-700 mb-4'
};
