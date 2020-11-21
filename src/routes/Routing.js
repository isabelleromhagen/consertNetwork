import React, {useEffect, useContext} from 'react'
import {UserContext} from '../shared/global/provider/UserProvider'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import RoutingPath from './RoutingPath'
import {ProfileView} from '../view/ProfileView'
import {SignInView} from '../view/SignInView'
import {SettingsView} from '../view/SettingsView'
import {BrowseView} from '../view/BrowseView'
import {BandView} from '../view/BandView'
import {CommunityView} from '../view/CommunityView'

export const Routing = (props) => {

    const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)

    const blockIfAuth = (navigateToView) => {
        return authenticatedUser ? BrowseView : navigateToView
    }

    const blockIfNotAuth = (navigateToView) => {
        return authenticatedUser ? navigateToView : SignInView
    }

    const checkIfLoggedIn = () => {
        setAuthenticatedUser(localStorage.getItem("username"))
    }

    useEffect(() => {
        checkIfLoggedIn()
    })

    return(
        <Router>
        {props.children}
            <Switch>
                <Route exact path={RoutingPath.profileView} component={blockIfNotAuth(ProfileView)}/>
                <Route exact path={RoutingPath.settingsView} component={blockIfNotAuth(SettingsView)}/>
                <Route exact path={RoutingPath.browseView} component={BrowseView}/>
                <Route exact path={RoutingPath.bandView} component={BandView}/>
                <Route exact path={RoutingPath.communityView} component={CommunityView}/>
                <Route exact path={RoutingPath.signInView} component={blockIfAuth(SignInView)}/>
                <Route component={BrowseView}/>
            </Switch>
        </Router>
    )
}