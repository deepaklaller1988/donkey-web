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
  title: "Donkey | Watch Free Movies Online",
  description: "Donkey – the ultimate destination for global entertainment! Watch HD Movies & TV Shows online for Free!",
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
