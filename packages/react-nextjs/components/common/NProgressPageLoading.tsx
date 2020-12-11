import React, { memo, useEffect } from 'react';
import nProgress from 'nprogress';
import { Router } from 'next/router';
import Head from 'next/head';

export const NProgressPageLoading = memo(() => {
  if (process.browser) {
    useEffect(() => {
      nProgress.configure({
        minimum: 0.3,
        easing: 'ease',
        speed: 800,
        showSpinner: false
      });
      let timeoutId: number | null = null;
      const handleStart = () => {
        timeoutId = +setTimeout(() => nProgress.start(), 100);
      };
      const handleEnd = () => {
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
        nProgress.done();
      };

      Router.events.on('routeChangeStart', handleStart);
      Router.events.on('routeChangeComplete', handleEnd);
      Router.events.on('routeChangeError', handleEnd);

      return () => {
        handleEnd();
        Router.events.off('routeChangeStart', handleStart);
        Router.events.off('routeChangeComplete', handleEnd);
        Router.events.off('routeChangeError', handleEnd);
      };
    }, []);
  }

  return (
    <Head>
      <link rel="stylesheet" type="text/css" href="/nprogress.css" />
    </Head>
  );
});

NProgressPageLoading.displayName = 'NProgressPageLoading';
