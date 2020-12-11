import React, { memo, ReactNode } from 'react';
import NextHead from 'next/head';

export interface PageHeadProps {
  title: string;
  description: string;
  children?: ReactNode;
}

export const PageHead = memo(({ title, description, children }: PageHeadProps) => {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      {children}
    </NextHead>
  );
});

PageHead.displayName = 'PageHead';
