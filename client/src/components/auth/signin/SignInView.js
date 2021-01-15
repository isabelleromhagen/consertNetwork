  
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {UserContext} from '../../../shared/global/provider/UserContext';
import AuthService from '../../../shared/api/service/AuthService';
import RoutingPath from "../../../routes/RoutingPath";
import "../../profile/Profile.css";

const SignInView = () => {
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
      }
    })
  }

  return (
    <div className="settingsWrapper">
    <form onSubmit={login}>
      <span className="inputSpan">Email </span>
      <input name="email" onChange={onChange} value={user.email}/>
      <br />
      <span className="inputSpan">Password </span>
      <input
      name="password"
        type="password"
        onChange={onChange}
        value={user.password}
      />
      <br />
      <button type="submit" className="formButton">
        Log in
      </button>
      <br />
      </form>
      <div className="clickToSignUp">
        <span className="noAccount">No account?</span> <br />
        <button
          className="formButton"
          onClick={() => history.push(RoutingPath.signUpView)}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default SignInView;
