"use client";

import React from "react"; 
import { useState, createContext, useContext } from "react";
import { Info } from "../Info"; 

// Use React Context with useState, source: https://medium.com/comsystoreply/how-to-use-react-context-with-usestate-c8ae4fe72fb9

// type of InformationContext 
type InformationContextType = {
  context: Info;
  setContext: React.Dispatch<React.SetStateAction<Info>>;
};

// initial default value of InformationContext 
const defaultInfo: Info = {
  firstName: "",
  lastName: "",
  buid: "",
  emailAddress: "",
};

const InformationContext = createContext<InformationContextType | null>(null);

// pass the default information value into the children 
export const InformationProvider = ({ children }: { children: React.ReactNode; }) => {
  const [info, setInfo] = useState<Info>(defaultInfo);

  return (
    <InformationContext.Provider value={{ context: info, setContext: setInfo }}>
      {children}
    </InformationContext.Provider>
  );
};

// retrieve the value of InformationContext, while avoiding potential error  
export const useInformation = () => { 
  const context = useContext(InformationContext);
  if (!context) {
    throw new Error("Error! Wrong context! ");
  }
  return context;
};