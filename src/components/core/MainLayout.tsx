"use client";
import React, { createContext, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@components/core/HomeHeader";
import Footer from "@components/core/Footer";
import User from "@lib/User";
import { getToken } from "@lib/userToken";

export default function MainLayout({ children }: any) {
  const path = usePathname();
  const route = path.split("/");

  const isHome = () => {
    return !route.includes("auth")
      ? !route.includes("dashboard")
        ? true
        : false
      : false;
  };
  if (getToken) {
    User.role()
  }
  return (
    <div>
      {isHome() ? (
        <>
          <div className="w-full">
          {/* <AdComponent /> */}
            <Header />
            {children}
          <div className="w-full flex justify-center mt-5">
            <div className="w-full max-w-5xl">
              <div id="native-bottom-banner" className="flex justify-center" />
            </div>
          </div>
            <Footer />
          </div>
        </>
      ) : (
        <>
          <div>{children}</div>
        </>
      )}
    </div>
  );
}
