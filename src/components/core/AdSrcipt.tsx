"use client";
import { useEffect } from "react";

// Fix TypeScript: declare aclib on window
declare global {
  interface Window {
    aclib?: any;
  }
}

const AdScript = () => {
  // ✅ Monetag (KEEP ONLY THIS ONE)
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://ptichoolsougn.net/401/9136325";

    try {
      (document.body || document.documentElement).appendChild(script);
    } catch (error) {
      console.error("Error loading Monetag:", error);
    }

    return () => {
      try {
        (document.body || document.documentElement).removeChild(script);
      } catch { }
    };
  }, []);

  // ✅ Adcash (Popunders + Video Slider) → load aclib.js once
  useEffect(() => {
    const script = document.createElement("script");
    script.id = "aclib-main";
    script.src = "//acscdn.com/script/aclib.js";

    script.onload = () => {
      if (window.aclib) {
        // Adcash Popunder
        window.aclib.runPop({
          zoneId: "10622330",
        });

        // Adcash Video Slider
        window.aclib.runVideoSlider({
          zoneId: "10622338",
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      try {
        document.body.removeChild(script);
      } catch { }
    };
  }, []);

  return null;
};

export default AdScript;
