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

    loadScript("https://bvtpk.com/tag.min.js", {
      zone: "10620513",
    });

    loadScript("//dd.retedrabs.com/s7Kcjw3lbj0O/134505");

  }, [adStatus]);

  return null;
};

export default AdScript;