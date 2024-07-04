"use client";
import React, { createContext, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Header from "@components/core/HomeHeader";
import Footer from "@components/core/Footer";

export default function MainLayout({ children }: any) {
  const [loading, setLoading] = useState(false);
  const path = usePathname();
  const searchParams: any = useSearchParams();
  const route = path.split("/");

  const isHome = () => {
    return !route.includes("auth")
      ? !route.includes("dashboard")
        ? true
        : false
      : false;
  };

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
