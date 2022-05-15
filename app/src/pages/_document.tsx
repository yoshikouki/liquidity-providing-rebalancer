import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html data-theme="halloween">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="min-h-screen bg-base-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
