import NextApp from 'next/app';

export default class App extends NextApp {
  componentDidMount(): void {
    // Удаление SSR элементов, т.к. они нужны только для статичного отображения
    const jssStyles = document.querySelector('#jss-server-side');

    jssStyles?.parentElement?.removeChild(jssStyles);
  }
}
