import NextApp from 'next/app';
import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { NProgressPageLoading } from '@app/react-nextjs/components/common/NProgressPageLoading';
import '@app/react-nextjs/public/fix-root-size.css';
import '@app/react-nextjs/public/disable-overscroll.css';

export default class App extends NextApp {
  componentDidMount(): void {
    // Удаление SSR элементов, т.к. они нужны только для статичного отображения
    const jssStyles = document.querySelector('#jss-server-side');

    jssStyles?.parentElement?.removeChild(jssStyles);
  }

  render() {
    return (
      <>
        <CssBaseline />
        <NProgressPageLoading />
        {super.render()}
      </>
    );
  }
}
