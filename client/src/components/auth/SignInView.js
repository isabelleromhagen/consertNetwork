import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {UserContext} from '../../shared/UserContext';
import AuthService from '../../shared/services/AuthService';
import RoutingPath from "../../routes/RoutingPath";
import "../profile/Profile.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Button, TextField, Typography, Grid,
Card, CardContent, CardHeader} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

const SignInView = () => {
  const theme = useTheme();
  const currentUser = useContext(UserContext);
  const history = useHistory();
  const [user, setUser] = useState({email: "", password: ""});

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value});
  }

  const login = (e) => {
    e.preventDefault();
    AuthService.login(user).then(data => {
      const {token, user} = data;
      if(token) {
        currentUser.setUser(user);
        currentUser.setIsAuthenticated(true);
        currentUser.setToken(token);
        history.push(RoutingPath.browseView);
      } else {
        toast(`Wrong credentials!`);
      }
    })
  }

  return (
    <div className="settingsWrapper" >
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Card style={{ padding:'10vh' }}>
          <CardContent>
          <CardHeader title="Sign in"/>
            <form onSubmit={login} className="signinForm">
              <TextField
                      name="email"
                      variant="outlined"
                      color="secondary"
                      type="email"
                      label="Email"
                      onChange={onChange}
                      value={user.email}
                      style={{
                    display:"block",
                      fontSize: 14,
                      marginBottom: "5vh",
                    }}
                        />
              <TextField
                      name="password"
                      variant="outlined"
                      color="secondary"
                      type="password"
                      label="Password"
                      onChange={onChange}
                      value={user.password}
                      style={{
                        display:"block",
                        fontSize: 14,
                        marginBottom: "5vh",
                        marginTop: "5vh"
                      }}
                        />

              <Button 
                  type="submit" 
                  className="formButton" 
                  size="large" 
                  style={{
                    display:"block",
                      fontSize: 14,
                      marginBottom: "5vh",
                      marginTop: "2vh",
                      marginLeft: "3vw",
                      width: "10vw"
                    }}
                  color="primary"
                  variant="contained">
                Sign in
              </Button>
              </form>
            <ToastContainer />
            <div className="clickToSignUp">
              <Typography>No account?</Typography>
              <Button
                className="formButton"
                size="large" 
                style={{
                    fontSize: 14,
                    marginTop: "2vh",
                  }}
                color="primary"
                variant="contained"
                onClick={() => history.push(RoutingPath.signUpView)
                }
              >
                Sign up
              </Button>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default SignInView;
