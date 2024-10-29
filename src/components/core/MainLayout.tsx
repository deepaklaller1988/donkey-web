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
            <Header />
            {children}
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
