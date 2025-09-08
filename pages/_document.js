// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Optional: Apple Touch Icon for iOS */}
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />

        {/* Optional: theme color */}
        <meta name="theme-color" content="#689f38" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
