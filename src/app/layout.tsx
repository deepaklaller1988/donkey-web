import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
// const inter = Inter({ subsets: ["latin"] });
import MainLayout from "@components/core/MainLayout";
import Provider from "@components/core/Provider";

import ToastProvider from "@components/core/ToasterProvider";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Donkey | Watch Free Movies Online",
  description:
    "Donkey – the ultimate destination for global entertainment! Watch HD Movies & TV Shows online for Free!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="galaksion-domain-verification"
          content="9c215d0ab770acaa88d7a0fbaadb53947827230566f709ea392f337b98b30058"
        />
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-7QQKB1XSQF"></script>
        <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-7QQKB1XSQF');
        </script> */}
        <Script
          data-cfasync="false"
          async
          type="text/javascript"
          src="//gd.jiggleowk.com/r2KRbDFG7isno7/109807"
          // strategy="afterInteractive"
        />
        {/* <script data-cfasync="false" async type="text/javascript" src="//lirotroodles.com/ndMqTp3EaRih1f/109859"></script> */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-7QQKB1XSQF"
        />
        <Script id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-7QQKB1XSQF');
          `}
        </Script>
      </head>
      <body>
        <Provider>
          <MainLayout>{children}</MainLayout>
          <ToastProvider />
        </Provider>
      </body>
    </html>
  );
}
