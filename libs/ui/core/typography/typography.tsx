import { HTMLElementType } from '../../types';
import clsx from 'clsx';
import { ReactNode } from 'react';

export interface TypographyProps {
  className?: string;
  children: NonNullable<ReactNode>;
  type?: TypographyType;
}

export type TypographyType = 'label' | 'body' | 'h1' | 'h2' | 'h3';

export function Typography({ children, className, type = 'body' }: TypographyProps) {
  const Component = ElementsTypes[type];

  return <Component className={clsx(ClassNames[type], className)}>{children}</Component>;
}

const ElementsTypes: Record<TypographyType, HTMLElementType> = {
  label: 'label',
  body: 'span',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3'
};

const ClassNames: Record<TypographyType, string> = {
  label: 'text-base font-medium leading-normal tracking-[0.4px] text-ui-label mb-2',
  body: 'text-sm font-normal text-black',
  h1: 'text-9xl font-extralight text-black mb-12',
  h2: 'text-8xl font-extralight text-black mb-8',
  h3: 'text-7xl font-normal text-black mb-6'
};
