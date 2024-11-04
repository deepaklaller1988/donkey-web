import type { Metadata } from "next";
import "./globals.css";
import MainLayout from "@components/core/MainLayout";
import Provider from "@components/core/Provider";
// import ScriptLoader from "@components/ScriptLoader";
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
          {/* <ScriptLoader> */}
            <MainLayout>{children}</MainLayout>
          {/* </ScriptLoader> */}
          <ToastProvider />
        </Provider>
      </body>
    </html>
  );
}
