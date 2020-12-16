import React, { useContext } from "react";
import {useHistory} from "react-router-dom"
import {UserContext} from "../../shared/global/provider/UserContext"
import RoutingPath from '../../routes/RoutingPath'
import UserIcon from "../../shared/images/user.svg";
import "./Profile.css"

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
        <div className="dropDown">
            {currentUser && currentUser.user.username !== "" && <span>{currentUser.user.username}</span>}
            <a onClick={()=> history.push(RoutingPath.settingsView)}>Settings</a>
            <a onClick={()=> history.push(RoutingPath.profileView)}>Profile</a>
            <hr/>
            <a onClick={()=>logout()}>Log out</a>
        </div>
      </div>
    );

}