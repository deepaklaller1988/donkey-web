"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const ScriptLoader = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [shouldLoadScript, setShouldLoadScript] = useState(true);

  // useEffect(() => {
  //   if (pathname.includes("watch-now") || pathname.includes("profile")) {
  //     setShouldLoadScript(false);
  //   } else {
  //     setShouldLoadScript(true);
  //   }
  // }, [pathname]);
  useEffect(() => {
    // Define the pages where you do NOT want the ad script to run
    const noAdPages = ['/profile',"/watch-now"];

    // Check if the current path is in the noAdPages list
    const shouldLoadAds = !noAdPages.includes(pathname);
    console.log(pathname,shouldLoadAds,"============")

    if (shouldLoadAds) {
      // Load your ad script here
      const script = document.createElement('script');
      script.src = '//by.reicezenana.com/r42sXNu9GFHjdSXjY/109807';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [pathname]);
  return (
    <>
      {/* {shouldLoadScript && (
        <script
          data-cfasync="false"
          async
          type="text/javascript"
          src="//by.reicezenana.com/r42sXNu9GFHjdSXjY/109807"
        ></script>
      )} */}
      {children}
    </>
  );
};

export default ScriptLoader;
