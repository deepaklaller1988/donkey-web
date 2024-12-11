// "use client";

// import { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";

// const ScriptLoader = ({ children, onRemoveScript }: { children: React.ReactNode; onRemoveScript: () => void; }) => {
//   const pathname = usePathname();
//   const [isScriptLoaded, setIsScriptLoaded] = useState(false);
//   const [suppressAds, setSuppressAds] = useState(false);
//   const [isUserClicked, setIsUserClicked] = useState(false); // Track if user clicked

//   useEffect(() => {
//     const noAdPages = ["/profile", "/watch-now"];
//     const shouldLoadAds = !noAdPages.includes(pathname);

//     if (shouldLoadAds && !isScriptLoaded) {
//       const script = document.createElement("script");
//       script.src = "//by.reicezenana.com/r42sXNu9GFHjdSXjY/109807";
//       script.async = true;
//       document.body.appendChild(script);
//       setIsScriptLoaded(true);
//       console.log("Ad script loaded.");

//       return () => {
//         document.body.removeChild(script);
//         console.log("Ad script removed.");
//       };
//     }

//     const handleClick = () => {
//       if (!isUserClicked) {
//         setIsUserClicked(true);
//         console.log("User clicked. Now allowing scroll.");
//         document.body.style.overflow = 'auto'; // Enable scroll on click
//       }
//     };

//     document.addEventListener("click", handleClick);

//     return () => {
//       document.removeEventListener("click", handleClick);
//     };
//   }, [pathname, isScriptLoaded, isUserClicked]);

//   useEffect(() => {
//     // Prevent scrolling until user clicks
//     if (!isUserClicked) {
//       document.body.style.overflow = 'hidden'; // Disable scroll
//     }
//   }, [isUserClicked]);

//   useEffect(() => {
//     if (suppressAds) {
//       const script = document.getElementById("script");
//       if (script) {
//         document.body.removeChild(script);
//         setIsScriptLoaded(false);
//         onRemoveScript();
//       }
//     }
//   }, [suppressAds]);

//   return <>{children}</>;
// };

// export default ScriptLoader;
"use client";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const ScriptLoader = ({ children, excludedPaths, excludedButtonIds }: any) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const pathname = usePathname();

  const loadAdScript = () => {
    if (!document.getElementById('ad-script')) {
      const script = document.createElement('script');
      // script.src = '//by.reicezenana.com/r42sXNu9GFHjdSXjY/109807';
      script.async = true;
      script.id = 'ad-script';
      document.body.appendChild(script);
      sessionStorage.setItem('adScriptLoaded', 'true');
    }
  };

  const removeAdScript = () => {
    const script = document.getElementById('ad-script');
    if (script) {
      document.body.removeChild(script);
      sessionStorage.removeItem('adScriptLoaded'); // Clear the session storage as well
    }
  };

  const handleClickOverlay = () => {
    setIsOverlayVisible(false);
    loadAdScript();
  };

  useEffect(() => {
    const scriptLoaded = sessionStorage.getItem('adScriptLoaded') === 'true';
    const shouldLoadScript = !excludedPaths.includes(pathname);

    if (shouldLoadScript && !scriptLoaded) {
      loadAdScript();
    } else if (!shouldLoadScript && scriptLoaded) {
      // If on an excluded path and the script is loaded, remove it
      removeAdScript();
    }

    return () => {
      // Clean up effect (not needed for overflow handling)
    };
  }, [excludedPaths, pathname]);

  useEffect(() => {
    if (isOverlayVisible) {
      const handleClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const isExcludedButton = excludedButtonIds.includes(target.id);

        if (!isExcludedButton) {
          handleClickOverlay();
        }
      };

      document.addEventListener('click', handleClick);

      return () => {
        document.removeEventListener('click', handleClick);
      };
    }
  }, [isOverlayVisible, excludedButtonIds]);

  return (
    <>
      {children}
    </>
  );
};

export default ScriptLoader;
