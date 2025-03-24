
import { createContext, useContext, useState, ReactNode } from "react";

interface SpecificationContextType {
  specification: string;
  setSpecification: (specification: string) => void;
  clearSpecification: () => void;
}

const SpecificationContext = createContext<SpecificationContextType | undefined>(undefined);

export function SpecificationProvider({ children }: { children: ReactNode }) {
  const [specification, setSpecification] = useState<string>("");

  const clearSpecification = () => setSpecification("");

  return (
    <SpecificationContext.Provider value={{ specification, setSpecification, clearSpecification }}>
      {children}
    </SpecificationContext.Provider>
  );
}

export function useSpecification() {
  const context = useContext(SpecificationContext);
  if (context === undefined) {
    throw new Error("useSpecification must be used within a SpecificationProvider");
  }
  return context;
}
