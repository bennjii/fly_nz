
import '../styles/globals.css'
import type { AppProps /*, AppContext */ } from 'next/app'
import dynamic from 'next/dynamic';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

// export default dynamic(() => Promise.resolve(App), {
//   ssr: false,
// });

export default App
