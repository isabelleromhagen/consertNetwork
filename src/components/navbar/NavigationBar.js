import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {UserContext} from '../../shared/global/provider/UserProvider'
import {Profile} from '../profile/Profile'
import RoutingPath from '../../routes/RoutingPath'
import './NavigationBar.css'

export const NavigationBar = () => {
    const history = useHistory();
    
    return (
        <div className= "navWrapper">
            <div className="topOfNav">
                Logo
            </div>
         
            <div className="tabs">
                Profile
            </div>
        </div>
    )
}