import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../shared/UserContext";
import { ProfileOptions } from "../profile/ProfileOptions";
import RoutingPath from "../../routes/RoutingPath";
import Icon from "../../shared/images/music.svg";
import {Typography} from '@material-ui/core';
import "./NavigationBar.css";

export const NavigationBar = () => {
  const history = useHistory();
  const currentUser = useContext(UserContext);

  const goToFeed = () => {
      currentUser.setShowFeed(true);
      history.push(RoutingPath.browseView);
    }

  const displayIfAuth = () => {
    return (
        <div className="authOptions">
          {currentUser && currentUser.isAuthenticated
            ? 
           <div className="profile"><ProfileOptions /></div>
            : 
          <Typography onClick={() => history.push(RoutingPath.signInView)} className="signin">Sign in</Typography>}
        </div>
    );
  };
  return (
    <div className="navWrapper">
          <img
            onClick={() => goToFeed()}
            src={Icon}
            alt="music icon"
            className="musicIcon"
          />
          <div className="tabs">
              
              <Typography
                onClick={() => goToFeed()}
                className="navTab"
                >
                Feed
              </Typography>
              <Typography
                onClick={() => history.push(RoutingPath.communityView)}
                className="navTab"
                >
                Community
              </Typography>
          </div>
          {displayIfAuth()}
    </div>
  );
};