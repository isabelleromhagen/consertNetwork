import React, { useContext } from "react";
import {useHistory} from "react-router-dom"
import {UserContext} from "../../shared/UserContext"
import RoutingPath from '../../routes/RoutingPath'
import UserIcon from "../../shared/images/user.svg";
import {Typography} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
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

    const goToProfile = () => {
      currentUser.setProfile(currentUser.user)
      history.push(RoutingPath.profileView);
    }

    return (
      <div className="profileWrapper">
        <img
          onClick={() => goToProfile()}
          src={UserIcon}
          alt="user icon"
          className="userIcon"
        />
        <div className="dropDownProfile">
            {currentUser && currentUser.user.username !== "" && <Typography onClick={() => goToProfile()}>{currentUser.user.username}</Typography>}
           
            <SettingsIcon onClick={()=> history.push(RoutingPath.settingsView)}/>
            
            <hr/>
            
            <ExitToAppIcon style={{display:"inline"}} onClick={()=>logout()}/>
        </div>
      </div>
    );

}

// <Typography style={{display:"inline", marginRight:"2vw"}} onClick={()=>logout()}>Log out</Typography>
//  <Typography onClick={()=> history.push(RoutingPath.settingsView)}>Settings</Typography>
// <Typography onClick={()=> history.push(RoutingPath.profileView)}>Profile</Typography>