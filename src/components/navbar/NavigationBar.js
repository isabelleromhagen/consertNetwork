import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../shared/global/provider/UserProvider";
import { Profile } from "../profile/Profile";
import RoutingPath from "../../routes/RoutingPath";
import Icon from "../../shared/images/music.svg";
import "./NavigationBar.css";

export const NavigationBar = () => {
  const history = useHistory();
  const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext);

  const displayUserIfAuthenticated = () => {
    return (authenticatedUser) ? 
      <div className="profile"><Profile /></div>
     : 
      <span onClick={() => history.push(RoutingPath.signInView)} className="signin">Sign in</span>
  };
  return (
    <div className="navWrapper">
      <div className="topOfNav">
        <img
          onClick={() => history.push(RoutingPath.browseView)}
          src={Icon}
          alt="music icon"
          className="musicIcon"
        />
        {displayUserIfAuthenticated()}
      </div>

      <div className="tabs">
        <span onClick={() => history.push(RoutingPath.profileView)}>
          {" "}
          Profile
        </span>
        <span onClick={() => history.push(RoutingPath.browseView)}>
          {" "}
          Browse{" "}
        </span>
        <span onClick={() => history.push(RoutingPath.communityView)}>
          {" "}
          Community{" "}
        </span>
      </div>
    </div>
  );
};
