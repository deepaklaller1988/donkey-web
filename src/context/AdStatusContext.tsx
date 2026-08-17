"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface AdStatusContextType {
  adStatus: boolean | null;
  setAdStatus: React.Dispatch<React.SetStateAction<boolean | null>>;
  toggleAdStatus: () => void;
}

const AdStatusContext = createContext<AdStatusContextType | undefined>(
  undefined
);

export const AdStatusProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [adStatus, setAdStatus] = useState<boolean | null>(null);

  useEffect(() => {
    const savedStatusAd = sessionStorage.getItem("adStatus");

    if (savedStatusAd === null) {
      // No preference saved → default ON
      setAdStatus(true);
    } else {
      setAdStatus(savedStatusAd === "true");
    }
  }, []);

  const toggleAdStatus = () => {
    const newValue = adStatus === false;

    sessionStorage.setItem("adStatus", String(newValue));

    setAdStatus(newValue);
    window.location.reload();
  };

  return (
    <AdStatusContext.Provider
      value={{
        adStatus,
        setAdStatus,
        toggleAdStatus,
      }}
    >
      {children}
    </AdStatusContext.Provider>
  );
};

export const useAdStatus = () => {
  const context = useContext(AdStatusContext);

  if (!context) {
    throw new Error("useAdStatus must be used inside AdStatusProvider");
  }

  return context;
};