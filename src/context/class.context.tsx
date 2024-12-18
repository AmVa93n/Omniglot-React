import React, { createContext, useState, PropsWithChildren } from "react";
import { Class } from "../types";

const ClassContext = createContext({} as context);

interface context {
  managedClass: Class | null
  setManagedClass: React.Dispatch<React.SetStateAction<Class | null>>
}

function ClassProvider({ children }: PropsWithChildren) {
  const [managedClass, setManagedClass] = useState<Class | null>(null)

  return (
    <ClassContext.Provider
      value={{
        managedClass, setManagedClass
      }}
    >
      {children}
    </ClassContext.Provider>
  );
}

export { ClassProvider, ClassContext };
