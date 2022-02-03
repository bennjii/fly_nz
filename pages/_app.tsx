
import '../styles/globals.css'
import '../styles/nprogress.css'
import type { AppProps /*, AppContext */ } from 'next/app'
import dynamic from 'next/dynamic';

import NProgress from "nprogress"
import Head from "next/head"
import Router from "next/router"

Router.events.on("routeChangeError", NProgress.done);
Router.events.on("routeChangeStart", NProgress.start);
Router.events.on("routeChangeComplete", NProgress.done);

function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head> 
				<title>FlyNZ</title>
				<link rel="icon" href="/icon.png" />
			</Head>

			<Component {...pageProps} />
		</> 
	)
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
