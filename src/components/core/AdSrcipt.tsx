"use client";
import { useEffect } from "react";

const AdScript = () => {
  useEffect(() => {
    const scripts: HTMLScriptElement[] = [];

    const loadScript = (src: string) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.setAttribute("data-cfasync", "false");

      (document.body || document.documentElement).appendChild(script);
      scripts.push(script);
    };

    // ✅ Galaksion Popunder
    loadScript("//sa.shanksmagh.com/rvUKZVqmljmA/NgvMR");

    // ✅ Galaksion Native Shufflebox (Vignette)
    loadScript("//ph.mislucktinean.com/sACMVWVZf46BJo/134505");

    // ✅ Galaksion Video Ad
    loadScript("//bx.simulasending.com/vtZj1yeasXrJq/134507");

    return () => {
      // Cleanup on unmount
      scripts.forEach((script) => {
        try {
          script.remove();
        } catch {}
      });
    };
  }, []);

  return null;
};

export default AdScript;
