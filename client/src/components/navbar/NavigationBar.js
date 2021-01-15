import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../shared/global/provider/UserContext";
import { ProfileOptions } from "../profile/ProfileOptions";
import RoutingPath from "../../routes/RoutingPath";
import Icon from "../../shared/images/music.svg";
import "./NavigationBar.css";

export const NavigationBar = () => {
  const history = useHistory();
  const currentUser = useContext(UserContext);

  const displayIfAuth = () => {
    return (
        <div className="authOptions">
          {currentUser && currentUser.isAuthenticated
            ? 
           <div className="profile"><ProfileOptions /></div>
            : 
          <span onClick={() => history.push(RoutingPath.signInView)} className="signin">Sign in</span>}
        </div>
    );
  };
  return (
    <div className="navWrapper">
          <img
            onClick={() => history.push(RoutingPath.browseView)}
            src={Icon}
            alt="music icon"
            className="musicIcon"
          />
          <div className="tabs">
              <div
                onClick={() => history.push(RoutingPath.profileView)}
                value="Profile"
                className="navTab"
                >
                Profile
              </div>
              <div
                onClick={() => history.push(RoutingPath.browseView)}
                className="navTab"
                >
                Browse
              </div>
              <div
                onClick={() => history.push(RoutingPath.communityView)}
                className="navTab"
                >
                Community
              </div>
          </div>
          {displayIfAuth()}
    </div>
  );
};