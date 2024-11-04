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

const ScriptLoader = ({ children }:any) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);

  const loadAdScript = () => {
    if (!document.getElementById('ad-script')) {
      const script = document.createElement('script');
      script.src = '//by.reicezenana.com/r42sXNu9GFHjdSXjY/109807';
      script.async = true;
      script.id = 'ad-script';
      document.body.appendChild(script);
      sessionStorage.setItem('adScriptLoaded', 'true');
    }
   
  };

  const handleClickOverlay = () => {
    setIsOverlayVisible(false);
    document.body.style.overflow = 'auto';
    loadAdScript(); 
  };

  useEffect(() => {
    const scriptLoaded = sessionStorage.getItem('adScriptLoaded') === 'true';

    if (!scriptLoaded) {
      loadAdScript();
    }

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto'; 
    };
  }, []);

  useEffect(() => {
    if (isOverlayVisible) {
      const handleClick = () => {
        handleClickOverlay();
      };

      document.addEventListener('click', handleClick);

      return () => {
        document.removeEventListener('click', handleClick);
      };
    }
  }, [isOverlayVisible]);

  return (
    <>
      {children}
    </>
  );
};

export default ScriptLoader;

