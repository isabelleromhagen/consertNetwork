import React, {useState, useContext} from "react";
import {useHistory} from 'react-router-dom';
import {UserContext} from '../../shared/UserContext';
import RoutingPath from "../../routes/RoutingPath";
import AuthService from "../../shared/services/AuthService";
import {Button, TextField, Grid, Typography,
Card, CardContent, CardHeader} from '@material-ui/core';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpView = () => {
  const history = useHistory();
  const currentUser = useContext(UserContext);
  const [user, setUser] = useState({ username: "", email: "", password: "", repeatedPassword: "", fileId: "noImage" });

   const login = () => {
     AuthService.login(user).then((data) => {
       const { token, user } = data;

       if (token) {
         currentUser.setUser(user);
         currentUser.setIsAuthenticated(true);
         currentUser.setToken(token);
         history.push(RoutingPath.browseView);
       } else {
         toast(`Wrong credentials!`);
       }
     });
   };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if(user.password.length < 6) {
      toast(`Passwords must be at least 6 characters!`);
      return;
    }
    if(user.password !== user.repeatedPassword) {
        toast(`Passwords must match!`);
        return;
    }
      AuthService.register(user).then((data) => {
      if(data) {
         login()
         return;
      } 
    });
  };
  return (
    <div className="settingsWrapper">
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
          <CardHeader title="Sign up"/>

        <form onSubmit={onSubmit} className="signinForm">
          <TextField
              name="email"
              variant="outlined"
              color="secondary"
              type="email"
              label="Email"
              onChange={onChange}
              value={user.email}
              required
              style={{
                    display:"block",
                    fontSize: 14, 
                    marginBottom: "5vh",
                    }}
                />
          <TextField
              name="username"
              variant="outlined"
              color="secondary"
              type="username"
              label="Username"
              onChange={onChange}
              value={user.username}
              required
              style={{
                    display:"block",
                      fontSize: 14, 
                      marginBottom: "5vh",
                      marginTop: "5vh",
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
              required
              style={{
                    display:"block",
                      fontSize: 14, 
                      marginBottom: "5vh",
                      marginTop: "5vh",
                    }}
                />
          <TextField
              name="repeatedPassword"
              variant="outlined"
              color="secondary"
              type="password"
              label="Repeat password"
              onChange={onChange}
              value={user.repeatedPassword}
              required
              style={{
                  display:"block",
                  fontSize: 14, 
                  marginBottom: "5vh",
                  marginTop: "5vh",
                  }}
                />
          <Button 
            type="submit" 
            className="formButton" 
            size="large" 
            style={{
              fontSize: 14,
              marginBottom: "5vh",
              marginTop: "2vh",
              marginLeft: "3vw",
              width: "10vw"
            }}
            color="primary"
            variant="contained">Register</Button>
        </form>
        <ToastContainer/>
        <div className="clickToSignUp">
              <Typography>Have an account already?</Typography>
              <Button
                className="formButton"
                size="large" 
                style={{
                    fontSize: 14,
                    marginTop: "2vh",
                    marginLeft: "2vw",
                    width: "10vw"
                  }}
                color="primary"
                variant="contained"
                onClick={() => history.push(RoutingPath.signInView)
                }
              >
                Sign in
              </Button>
            </div>
        </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default SignUpView;