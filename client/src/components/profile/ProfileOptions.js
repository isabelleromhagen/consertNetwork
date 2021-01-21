import React, { useContext } from "react";
import {useHistory} from "react-router-dom"
import {UserContext} from "../../shared/UserContext"
import RoutingPath from '../../routes/RoutingPath'
import UserIcon from "../../shared/images/user.svg";
import {Typography} from '@material-ui/core';
// import "./Profile.css"
// import "../navbar/NavigationBar.css"

export const ProfileOptions = () => {
    const history = useHistory()
    const currentUser = useContext(UserContext);

    const logout = () => {
        currentUser.setUser(null)
        currentUser.setIsAuthenticated(false)
        currentUser.setToken(null)
        history.push(RoutingPath.signInView)
    }

    return (
      <div className="profileWrapper">
        <img
          onClick={() => history.push(RoutingPath.profileView)}
          src={UserIcon}
          alt="user icon"
          className="userIcon"
        />
        <div className="dropDownProfile">
            {currentUser && currentUser.user.username !== "" && <Typography>{currentUser.user.username}</Typography>}
            <Typography onClick={()=> history.push(RoutingPath.settingsView)}>Settings</Typography>
            <Typography onClick={()=> history.push(RoutingPath.profileView)}>Profile</Typography>
            <hr/>
            <Typography onClick={()=>logout()}>Log out</Typography>
        </div>
      </div>
    );

}