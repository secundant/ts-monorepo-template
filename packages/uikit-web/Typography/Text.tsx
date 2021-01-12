import React, { ComponentType, memo, ReactNode } from 'react';
import { Typography } from '@material-ui/core';

export interface TextProps {
  type?: TextType;
  gutterBottom?: boolean;
  className?: string;
  children: ReactNode;
}

export type TextType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'body1' | 'body2';

export const Text = memo(({ type, ...props }: TextProps) => {
  return <Typography variant={type} {...props} />;
});

Text.displayName = 'Text';

// TODO Fix after https://github.com/DefinitelyTyped/DefinitelyTyped/issues/36320
(Text as ComponentType<TextProps>).defaultProps = {
  type: 'body1',
  gutterBottom: false
};
