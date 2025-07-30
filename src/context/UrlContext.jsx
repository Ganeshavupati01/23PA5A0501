import React, { createContext, useState, useEffect } from 'react';

export const UrlContext= createContext();

export const UrlProvider= ({ children }) => {
  const [urlData, setUrlData]=useState(() => {
    const stored = localStorage.getItem('urlData');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(()=> {
    localStorage.setItem('urlData', JSON.stringify(urlData));
  },[urlData]);

  return (
    <UrlContext.Provider value={{urlData, setUrlData }}>
      {children}
    </UrlContext.Provider>
  );
};