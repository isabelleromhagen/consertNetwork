import React, {useState, useContext} from "react";
import {useHistory} from 'react-router-dom';
import {UserContext} from '../../../shared/global/provider/UserContext';
import RoutingPath from "../../../routes/RoutingPath";
import AuthService from "../../../shared/api/service/AuthService";
import "../../forms/Forms.css";

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
      <h3>Sign up</h3>
      <div className="updateWrapper">
        <form onSubmit={onSubmit}>
          <input
            name="email"
            value={user.email}
            onChange={onChange}
            required
            placeholder="Email"
          />
          <input
            name="username"
            value={user.username}
            onChange={onChange}
            required
            placeholder="Username"
          />
          <input
            name="password"
            value={user.password}
            onChange={onChange}
            required
            placeholder="Password"
            type="password"
          />
          <input
            name="password"
            value={user.password}
            onChange={onChange}
            required
            placeholder="Repeat password"
            type="password"
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpView;