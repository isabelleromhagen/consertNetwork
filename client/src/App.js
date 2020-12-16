import React from "react";
import { Routing } from "./routes/Routing";
// import {UserContext} from "./shared/global/provider/UserContext";
import UserContextProvider from './shared/global/provider/UserContext';
import { NavigationBar } from "./components/navbar/NavigationBar";
import "./shared/global/css/Global.css";

function App() {
  return (
    <UserContextProvider>
      <Routing>
        <NavigationBar />
      </Routing>
    </UserContextProvider>
  );
}

export default App;

// function App() {
//   return (
//     <UserProvider>
//       <Routing>
//         <NavigationBar />
//       </Routing>
//     </UserProvider>
//   );
// }

// value={{ user, setUser, isAuthenticated, setIsAuthenticated }}