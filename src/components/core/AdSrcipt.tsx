"use client";

import { useAdStatus } from "context/AdStatusContext";
import { useEffect } from "react";

const AdScript = () => {
  const { adStatus } = useAdStatus();

  useEffect(() => {
    // Still loading saved status
    if (adStatus === null) {
      return;
    }

    // Ads disabled
    if (adStatus === false) {
      document
        .querySelectorAll('[data-ad-script="true"]')
        .forEach((script) => script.remove());

      document.querySelectorAll("iframe").forEach((iframe) => {
        const computedStyle = window.getComputedStyle(iframe);

        const isAdIframe =
          iframe.hasAttribute("sandbox") ||
          (
            computedStyle.position === "fixed" &&
            computedStyle.zIndex === "2147463647"
          );

        if (isAdIframe) {
          iframe.remove();
        }
      });

      return;
    }

    // Ads enabled
    const loadScript = (
      src: string,
      dataset?: Record<string, string>
    ) => {
      if (
        document.querySelector(
          `script[data-ad-src="${src}"]`
        )
      ) {
        return;
      }

      const script = document.createElement("script");

      script.src = src;
      script.async = true;

      script.dataset.adScript = "true";
      script.dataset.adSrc = src;

      if (dataset) {
        Object.entries(dataset).forEach(([key, value]) => {
          script.dataset[key] = value;
        });
      }

      document.body.appendChild(script);
    };

    // // Galaksion Popunder
    // // loadScript("//sa.shanksmagh.com/rvUKZVqmljmA/NgvMR");
    // loadScript("//ob.algatyramin.com/rhDqkYurFPBdK2ten/134504");

    // // Galaksion Native Shufflebox (Vignette)
    // loadScript("//iz.solionenzymes.com/s5cjs9YKq8l/134505");

    // // Galaksion Video Ad
    // loadScript("//bx.simulasending.com/vtZj1yeasXrJq/134507");
    
    // loadScript("//d33f51dyacx7bd.cloudfront.net/?aydfd=1241784");


    // Pops Ad
    loadScript("https://bvtpk.com/tag.min.js", {
      zone: "10620513",
    });

    // Vignette Ad
    // loadScript("https://dd133.com/vignette.min.js", {
    //   zone: "10620518",
    // });

    // Native Bottom Banner
    // loadScript(
    //   "//zn.novaleelds.com/t1Rp01TbX9Aq1P52/136372",
    //   undefined,
    //   "native-bottom-banner"
    // );

    // Shuffle ad
    loadScript("//te.domineehexer.com/sEePh5Gi26IE7/134505");

    // AdsBoosters Script
    // loadScript("https://sads.adsboosters.xyz/c16bfa745bf6d305adc2cf171f486c49.js");

  }, [adStatus]);

  return null;
};

export default AdScript;