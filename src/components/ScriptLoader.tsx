"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const ScriptLoader = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [shouldLoadScript, setShouldLoadScript] = useState(true);
console.log(pathname)
  useEffect(() => {
    if (pathname.includes("watch-now") || pathname.includes("profile")) {
      setShouldLoadScript(false);
    } else {
      setShouldLoadScript(true);
    }
  }, [pathname]);

  return (
    <>
      {shouldLoadScript && (
        <script
          data-cfasync="false"
          async
          type="text/javascript"
          src="//by.reicezenana.com/r42sXNu9GFHjdSXjY/109807"
        ></script>
      )}
      {children}
    </>
  );
};

export default ScriptLoader;
