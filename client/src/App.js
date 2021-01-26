import React, {useContext} from "react";
import { Routing } from "./routes/Routing";
import { NavigationBar } from "./components/navbar/NavigationBar";
import UserContext from './shared/UserContext';
import "./shared/Global.css";
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { orange, green, deepPurple, blue,  } from '@material-ui/core/colors'
import { Container } from '@material-ui/core'

function App() {

  const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #333, #999)',
    border: 0,
    marginBottom: 15,
    borderRadius: 15,
    color: 'white',
    padding: '5px 30px'
  }
})

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

  const userContext = useContext(UserContext);

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