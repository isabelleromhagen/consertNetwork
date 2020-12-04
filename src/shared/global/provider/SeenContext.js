import React, { createContext, useState } from "react";

export const SeenContext = createContext();

export default ({ children }) => {
  const [seen, setSeen] = useState([]);
  return (
    <div>
      <SeenContext.Provider value={{ seen, setSeen }}>
        {children}
      </SeenContext.Provider>
    </div>
  );
};
