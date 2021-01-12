import React, {useContext} from "react";
import { Routing } from "./routes/Routing";
import { NavigationBar } from "./components/navbar/NavigationBar";
import UserContext from './shared/global/provider/UserContext';
// import { Box } from "@material-ui/core";
import "./shared/global/css/Global.css";

function App() {

  const userContext = useContext(UserContext);

  console.log('app context printout: ', userContext);

  return (
    

        <Routing>
          <NavigationBar />
        </Routing>

    
  );
}

export default App;

// <UserContextProvider>