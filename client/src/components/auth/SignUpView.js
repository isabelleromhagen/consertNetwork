import React, {useState, useContext} from "react";
import {useHistory} from 'react-router-dom';
import {UserContext} from '../../shared/UserContext';
import RoutingPath from "../../routes/RoutingPath";
import AuthService from "../../shared/services/AuthService";
import {Button, TextField, Typography, Grid,
Card, CardContent, CardHeader} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
// import "../../forms/Forms.css";
// import "../../profile/Profile.css";

const SignUpView = () => {
  const history = useHistory();
  const currentUser = useContext(UserContext);
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState(null);

   const login = () => {
     AuthService.login(user).then((data) => {
       const { token, user } = data;
       //if the authservice returned a token it is valid, meaning the user can be authenticated.
       if (token) {
         currentUser.setUser(user);
         currentUser.setIsAuthenticated(true);
         currentUser.setToken(token);
         history.push(RoutingPath.browseView);
       }
     });
   };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.register(user).then((data) => {
      const { message } = data;
      setMessage(message);
      login()
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

        <form onSubmit={onSubmit}>
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
                      fontSize: 14, //customize in px
                      marginBottom: "5vh",
                      marginTop: "5vh",
                      

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
                      fontSize: 14, //customize in px
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
                      fontSize: 14, //customize in px
                      marginBottom: "5vh",
                      marginTop: "5vh",
                      

                    }}
                />
          <TextField
              name="password"
              variant="outlined"
              color="secondary"
              type="password"
              label="Repeat password"
              onChange={onChange}
              value={user.password}
              required
              style={{
                    display:"block",
                      fontSize: 14, //customize in px
                      marginBottom: "5vh",
                      marginTop: "5vh",
                      

                    }}
                />
          <Button 
            type="submit" 
            className="formButton" 
            size="large" 
            style={{
              fontSize: 14, //customize in px
              marginBottom: "5vh",
                      marginTop: "2vh",
                      marginLeft: "4vw"
            }}
            color="primary"
            variant="contained">Register</Button>
        </form>
        </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default SignUpView;