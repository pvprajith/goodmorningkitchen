import '../styles/globals.css';
import Head from 'next/head';

export default function MyApp({Component, pageProps}){
  return (<>
    <Head>
      <title>Good Morning Kitchen – Fresh Idli & Dosa Batter in Pune</title>
      <meta name="description" content="Stone‑ground, naturally fermented Idli & Dosa batter. Delivered fresh every morning in Pune."/>
      <meta property="og:title" content="Good Morning Kitchen – Fresh Batter Daily"/>
      <meta property="og:description" content="Stone‑ground, naturally fermented batter delivered in Pune."/>
      <meta property="og:type" content="website"/>
      <meta property="og:image" content="/hero.png"/>
    </Head>
    <Component {...pageProps}/>
  </>);
}
