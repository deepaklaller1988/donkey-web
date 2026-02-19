"use client";
import { useEffect } from "react";

const AdScript = () => {
  useEffect(() => {
    const scripts: HTMLScriptElement[] = [];

    const loadScript = (src: string, dataset?: Record<string, string>,containerId?: string) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.setAttribute("data-cfasync", "false");

      if (dataset) {
        Object.entries(dataset).forEach(([key, value]) => {
          script.dataset[key] = value;
        });
      }

      if (containerId) {
        const container = document.getElementById(containerId);
        (container || document.body).appendChild(script);
      } else {
        document.body.appendChild(script);
      }

      scripts.push(script);
    };
    // // ✅ Galaksion Popunder
    // // loadScript("//sa.shanksmagh.com/rvUKZVqmljmA/NgvMR");
    // loadScript("//ob.algatyramin.com/rhDqkYurFPBdK2ten/134504");

    // // ✅ Galaksion Native Shufflebox (Vignette)
    // loadScript("//iz.solionenzymes.com/s5cjs9YKq8l/134505");

    // // ✅ Galaksion Video Ad
    // loadScript("//bx.simulasending.com/vtZj1yeasXrJq/134507");
    
    // loadScript("//d33f51dyacx7bd.cloudfront.net/?aydfd=1241784");

    // ✅ Pops Ad
    loadScript("https://bvtpk.com/tag.min.js", {
      zone: "10620513",
    });

    // ✅ Vignette Ad
    loadScript("https://dd133.com/vignette.min.js", {
      zone: "10620518",
    });

    // ✅ Native Bottom Banner
    loadScript(
      "//vb.lobbecalm.com/tkN4IVyz38weqhzH/136372",
      undefined,
      "native-bottom-banner"
    );

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
