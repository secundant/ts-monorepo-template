import NextErrorPage, { ErrorProps } from 'next/error';
import React, { ReactElement } from 'react';

export default function MyErrorPage(props: ErrorProps): ReactElement {
  return <NextErrorPage {...props} />;
}
