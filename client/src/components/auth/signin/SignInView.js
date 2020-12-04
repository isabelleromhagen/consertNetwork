  
import React, { useState, useContext } from "react";
import { UserContext } from "../../../shared/global/provider/UserProvider";
import { useHistory } from "react-router-dom";
import RoutingPath from "../../../routes/RoutingPath";
import "../../forms/Forms.css";

export const SignInView = () => {
  const history = useHistory();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext);

  const login = () => {
    setAuthenticatedUser(username);
    localStorage.setItem("username", username);
    history.push("/profile");
  };

  return (
    <div className="signinWrapper">
      <span>Username </span>
      <input onChange={(event) => setUsername(event.target.value)} />
      <br />
      <span>Password </span>
      <input
        type="password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <br />
      <button className="logInButton" onClick={() => login()}>
        Log in
      </button>{" "}
      <br />
      <div className="clickToSignUp">
        <span className="noAccount">No account?</span> <br />
        <button
          className="logInButton"
          onClick={() => history.push(RoutingPath.signUpView)}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};
