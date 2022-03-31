import React from 'react';

/**
 * @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37087#issuecomment-726158907
 */

declare module 'react' {
  function memo<T extends React.ComponentType<any>>(
    c: T,
    areEqual?: (
      prev: Readonly<React.ComponentProps<T>>,
      next: Readonly<React.ComponentProps<T>>
    ) => boolean
  ): T & {
    displayName?: string | undefined;
  };

  interface CSSProperties extends React.CSSProperties {
    [key: `--${string}`]: string | number | null | void;
  }
}
