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

  return null; 
};

export default AdScript;
