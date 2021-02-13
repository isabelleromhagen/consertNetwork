import React from "react";
import { Routing } from "./routes/Routing";
import { NavigationBar } from "./components/navbar/NavigationBar";
import "./shared/Global.css";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { green, deepPurple } from '@material-ui/core/colors'
import { Container } from '@material-ui/core'

function App() {

const theme = createMuiTheme({
  background: '#333333',
  typography: {
    h2: {
      fontSize: 24,
      marginBottom: 10,
    }
  },
    palette: {
    primary: {
      main: deepPurple[500],
    },
    secondary: {
      main: green[500]
    }
  }

})

  return (
    
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg">
          <Routing>
            <NavigationBar />
          </Routing>
        </Container>
      </ThemeProvider>
    
  );
}

export default App;