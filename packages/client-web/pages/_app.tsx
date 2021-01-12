import NextApp from 'next/app';
import React from 'react';
import { NProgressPageLoading } from '@my-project/client-web/components/common/NProgressPageLoading';
import '@my-project/client-web/public/fix-root-size.css';
import '@my-project/client-web/public/disable-overscroll.css';

export default class App extends NextApp {
  componentDidMount(): void {
    // Удаление SSR элементов, т.к. они нужны только для статичного отображения
    const jssStyles = document.querySelector('#jss-server-side');

    jssStyles?.parentElement?.removeChild(jssStyles);
  }

  render() {
    return (
      <>
        <NProgressPageLoading />
        {super.render()}
      </>
    );
  }
}
