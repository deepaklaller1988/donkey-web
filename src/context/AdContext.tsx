"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AdContextType {
  adsEnabled: boolean;
  disableAds: () => void;
  enableAds: () => void;
}

const AdContext = createContext<AdContextType | undefined>(undefined);

export const AdProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [adsEnabled, setAdsEnabled] = useState<boolean>(true);

  const disableAds = () => setAdsEnabled(false);
  const enableAds = () => setAdsEnabled(true);

  return (
    <AdContext.Provider value={{ adsEnabled, disableAds, enableAds }}>
      {children}
    </AdContext.Provider>
  );
};

 export const useAdContext = (): AdContextType => {
  const context = useContext(AdContext);
  if (context === undefined) {
    throw new Error('useAdContext must be used within an AdProvider');
  }
  return context;
};
