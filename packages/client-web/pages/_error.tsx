import React, { ReactElement } from 'react';
import NextErrorPage, { ErrorProps } from 'next/error';

export default function MyErrorPage(props: ErrorProps): ReactElement {
  return <NextErrorPage {...props} />;
}
