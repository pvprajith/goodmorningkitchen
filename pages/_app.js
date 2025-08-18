import '../styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Good Morning Kitchen – Fresh Batter</title>
        <meta name="description" content="Fresh Idli & Dosa batter delivered in Pune." />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
