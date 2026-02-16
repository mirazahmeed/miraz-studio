import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="scroll-smooth">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
          <style>{`
            :root {
              --font-syne: 'Syne', sans-serif;
              --font-manrope: 'Manrope', sans-serif;
            }
          `}</style>
        </Head>
        <body className="antialiased bg-[#0A0A0A] text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
