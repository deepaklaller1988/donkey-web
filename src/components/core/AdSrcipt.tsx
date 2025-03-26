"use client"
import { useEffect } from 'react';

const AdScript = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://whacmoltibsay.net/tag.min.js';
    script.setAttribute('data-zone', '8635156');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://ptichoolsougn.net/401/9136325`;

    try {
      (document.body || document.documentElement).appendChild(script);
    } catch (error) {
      console.error("Error appending script:", error);
    }

    return () => {
      try {
        (document.body || document.documentElement).removeChild(script);
      } catch (error) {
        console.error("Error removing script:", error);
      }
    };
  }, []);

  return null; 
};

export default AdScript;
