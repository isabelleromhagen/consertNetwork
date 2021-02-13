import React, { useContext } from "react";
import {useHistory} from "react-router-dom"
import {UserContext} from "../../shared/UserContext"
import RoutingPath from '../../routes/RoutingPath'
import UserIcon from "../../shared/images/user.svg";
import {Typography} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';

export const ProfileOptions = () => {
    const history = useHistory()
    const currentUser = useContext(UserContext);

    const logout = () => {
        currentUser.setUser(null)
        currentUser.setIsAuthenticated(false)
        currentUser.setToken(null)
        sessionStorage.removeItem('session')
        history.push(RoutingPath.signInView)
    }

    const goToProfile = () => {
      currentUser.setProfile(currentUser.user)
      history.push(RoutingPath.profileView)
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
            {currentUser && currentUser.user &&
            currentUser.user.username !== ""
             && <Typography onClick={() => goToProfile()}>{currentUser.user.username}</Typography>}
            <SettingsIcon onClick={()=> history.push(RoutingPath.settingsView)}/>
            <hr/> 
            <ExitToAppIcon style={{display:"inline"}} onClick={()=>logout()}/>
        </div>
      </div>
    );
}