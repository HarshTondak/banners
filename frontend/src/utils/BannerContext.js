import React, { createContext, useState, useContext } from "react";

const BannerContext = createContext();

export const BannerProvider = ({ children }) => {
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const triggerUpdate = () => {
    setUpdateTrigger((prev) => prev + 1);
  };

  return (
    <BannerContext.Provider value={{ updateTrigger, triggerUpdate }}>
      {children}
    </BannerContext.Provider>
  );
};

export const useBannerUpdate = () => {
  const context = useContext(BannerContext);
  if (context === undefined) {
    throw new Error("useBannerUpdate must be used within a BannerProvider");
  }
  return context;
};
