import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
// const inter = Inter({ subsets: ["latin"] });
import MainLayout from "@components/core/MainLayout";
import Provider from "@components/core/Provider";
import Head from "next/head";
import User from "@lib/User";
import ToastProvider from "@components/core/ToasterProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <Provider>
          <MainLayout>
            {children}
          </MainLayout>
          <ToastProvider />
        </Provider>
      </body>
    </html>
  );
}
