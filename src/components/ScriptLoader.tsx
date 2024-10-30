"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const ScriptLoader = ({ children, onRemoveScript }: { children: React.ReactNode; onRemoveScript: () => void; }) => {
  const pathname = usePathname();
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [suppressAds, setSuppressAds] = useState(false); 

  useEffect(() => {
    const noAdPages = ["/profile", "/watch-now"];
    const shouldLoadAds = !noAdPages.includes(pathname);

   
    if (shouldLoadAds && !isScriptLoaded) {
      const script = document.createElement("script");
      script.src = "//by.reicezenana.com/r42sXNu9GFHjdSXjY/109807"; 
      script.async = true;
      document.body.appendChild(script);
      setIsScriptLoaded(true);
      console.log("Ad script loaded."); 

      return () => {
        document.body.removeChild(script);
        console.log("Ad script removed."); // Log when the script is removed
      };
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const adFreeZones = ["login-button", "search-button", "profile-button"];
      if (!adFreeZones.includes(target.id)) {
        setSuppressAds(false);  
      }

      if (target.id === "login-button") {
        setSuppressAds(true); 
        console.log("Ads suppressed due to login click.");
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      setSuppressAds(false); 
    };
  }, [pathname, isScriptLoaded]);

  useEffect(() => {
    // Logic to prevent ads from displaying if suppressAds is true
    if (suppressAds) {
      console.log("Ads are suppressed due to login click");
      // Here you should interact with the ad script to prevent ads from displaying.
      // Depending on the ad service, you might need to call a function or set a variable.
    }
  }, [suppressAds]);

  // Call the provided function to remove the script
  const removeScript = () => {
    const script = document.getElementById("script");
    if (script) {
      document.body.removeChild(script);
      setIsScriptLoaded(false); // Update state
      onRemoveScript(); // Notify parent component to handle further actions
    }
  };

  // Call removeScript when suppressAds is set to true
  useEffect(() => {
    if (suppressAds) {
      removeScript();
    }
  }, [suppressAds]);

  return <>{children}</>;
};

export default ScriptLoader;
//by.reicezenana.com/r42sXNu9GFHjdSXjY/109807