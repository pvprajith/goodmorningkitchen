import '../styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (<>
    <Head>
      <title>Good Morning Kitchen – Fresh Batter Daily</title>
      <meta name="description" content="Stone-ground, naturally fermented Idli & Dosa batter. Freshly delivered every morning in Pune."/>
      <meta property="og:title" content="Good Morning Kitchen – Fresh Batter Daily"/>
      <meta property="og:description" content="Stone-ground, naturally fermented Idli & Dosa batter. Freshly delivered in Pune."/>
      <meta property="og:type" content="website"/>
      <meta property="og:url" content="https://goodmorningkitchen.com"/>
      <meta property="og:image" content="/food.jpg"/>
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:title" content="Good Morning Kitchen"/>
      <meta name="twitter:description" content="Fresh Idli & Dosa batter delivered every morning in Pune."/>
      <meta name="twitter:image" content="/food.jpg"/>
    </Head>
    <Component {...pageProps} />
  </>);
}
