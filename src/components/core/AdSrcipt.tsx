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

    // // ✅ Galaksion Popunder
    // // loadScript("//sa.shanksmagh.com/rvUKZVqmljmA/NgvMR");
    // loadScript("//ob.algatyramin.com/rhDqkYurFPBdK2ten/134504");

    // // ✅ Galaksion Native Shufflebox (Vignette)
    // loadScript("//iz.solionenzymes.com/s5cjs9YKq8l/134505");

    // // ✅ Galaksion Video Ad
    // loadScript("//bx.simulasending.com/vtZj1yeasXrJq/134507");
    loadScript("//d33f51dyacx7bd.cloudfront.net/?aydfd=1241784");

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
