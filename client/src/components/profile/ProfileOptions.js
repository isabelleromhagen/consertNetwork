import React, { useContext } from "react";
import {useHistory} from "react-router-dom"
import {UserContext} from "../../shared/global/provider/UserProvider"
import RoutingPath from '../../routes/RoutingPath'
import UserIcon from "../../shared/images/user.svg";
import "./Profile.css"

export const ProfileOptions = () => {
    const history = useHistory()
    const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)

    const logout = () => {
        localStorage.removeItem("username")
        localStorage.removeItem("profilePic")
        setAuthenticatedUser(false)
        history.push('/signInView')
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
            <span>{authenticatedUser}</span>
            <a onClick={()=> history.push(RoutingPath.settingsView)}>Settings</a>
            <a onClick={()=> history.push(RoutingPath.profileView)}>Profile</a>
            <hr/>
            <a onClick={()=>logout()}>Log out</a>
        </div>
      </div>
    );

}