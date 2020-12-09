import NextApp from 'next/app';
import { ThemeProvider } from '@app/react-nextjs/styles/ThemeProvider';
import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { NProgressPageLoading } from '@app/react-nextjs/components/NProgressPageLoading';
import '@app/react-nextjs/public/disable-overscroll.css';

export default class App extends NextApp {
  componentDidMount(): void {
    // Удаление SSR элементов, т.к. они нужны только для статичного отображения
    const jssStyles = document.querySelector('#jss-server-side');

    jssStyles?.parentElement?.removeChild(jssStyles);
  }

  render() {
    return (
      <ThemeProvider>
        <CssBaseline />
        <NProgressPageLoading />
        {super.render()}
      </ThemeProvider>
    );
  }
}
