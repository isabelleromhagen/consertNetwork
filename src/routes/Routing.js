import React, {useEffect, useContext} from 'react'
import {UserContext} from '../shared/global/provider/UserProvider'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import RoutingPath from './RoutingPath'
import {ProfileView} from '../components/profile/ProfileView'
import {SignInView} from '../components/auth/signin/SignInView'
import { SignUpView } from "../components/auth/signup/SignUpView";
import {SettingsView} from '../components/profile/settings/SettingsView'
import {BrowseView} from '../components/browse/BrowseView'
import {BandProfile} from '../components/band/BandProfile'
import {CommunityView} from '../components/community/CommunityView'

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

    return (
      <Router>
        {props.children}
        <Switch>
          <Route exact path="/" component={BrowseView} />
          <Route
            exact
            path={RoutingPath.profileView}
            component={blockIfNotAuth(ProfileView)}
          />
          <Route
            exact
            path={RoutingPath.settingsView}
            component={blockIfNotAuth(SettingsView)}
          />
          <Route exact path={RoutingPath.browseView} component={BrowseView} />
          <Route exact path={RoutingPath.bandProfile} component={BandProfile} />
          <Route
            exact
            path={RoutingPath.communityView}
            component={CommunityView}
          />
          <Route
            exact
            path={RoutingPath.signInView}
            component={blockIfAuth(SignInView)}
          />
          <Route
            exact
            path={RoutingPath.signUpView}
            component={blockIfAuth(SignUpView)}
          />
        </Switch>
      </Router>
    );
}