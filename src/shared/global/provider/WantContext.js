import React, { createContext, useState } from "react";

export const WantContext = createContext();

export default ({ children }) => {
  const [want, setWant] = useState([]);
  return (
    <div>
      <WantContext.Provider
        value={{ want, setWant }}
      >
        {children}
      </WantContext.Provider>
    </div>
  );
};
