import React from "react";
import { Routing } from "./routes/Routing";
import { UserProvider } from "./shared/global/provider/UserProvider";
import { NavigationBar } from "./components/navbar/NavigationBar";
import "./shared/global/css/Global.css";

function App() {
  return (
    <UserProvider>
      <Routing>
        <NavigationBar />
      </Routing>
    </UserProvider>
  );
}

export default App;
