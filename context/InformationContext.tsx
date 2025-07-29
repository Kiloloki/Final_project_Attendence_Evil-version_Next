// "use client";

// import { createContext } from "react";
// import { Info } from "../Info";

// type InformationContextType = {
//   context: Info;
//   setContext: React.Dispatch<React.SetStateAction<Info>>;
// };

// const InformationContext = createContext<InformationContextType | null>(null);

// export default InformationContext;

// app/context/InformationContext.tsx
"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { Info } from "../Info"; 

type InformationContextType = {
  context: Info;
  setContext: React.Dispatch<React.SetStateAction<Info>>;
};

const defaultInfo: Info = {
  firstName: "",
  lastName: "",
  buid: "",
  emailAddress: "",
};

const InformationContext = createContext<InformationContextType | null>(null);

export const InformationProvider = ({ children }: { children: ReactNode }) => {
  const [info, setInfo] = useState<Info>(defaultInfo);

  return (
    <InformationContext.Provider value={{ context: info, setContext: setInfo }}>
      {children}
    </InformationContext.Provider>
  );
};

export const useInformation = () => {
  const context = useContext(InformationContext);
  if (!context) {
    throw new Error("useInformation must be used within an InformationProvider");
  }
  return context;
};
