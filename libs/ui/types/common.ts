import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  JSXElementConstructor
} from 'react';

export type Nil = null | void | undefined;

export type RefOf<C extends ElementType> = ComponentPropsWithRef<C>['ref'];

export type HTMLElementType = keyof JSX.IntrinsicElements;

export type PropsOf<C extends HTMLElementType | JSXElementConstructor<any>> =
  JSX.LibraryManagedAttributes<C, ComponentPropsWithoutRef<C>>;

export type MergeProps<Base extends {}, Extended extends {}> = Base & Omit<Extended, keyof Base>;
