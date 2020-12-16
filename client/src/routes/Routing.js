import React, {useContext} from 'react'
import {UserContext} from '../shared/global/provider/UserContext'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import RoutingPath from './RoutingPath'
import ProfileView from '../components/profile/ProfileView'
import SignInView from '../components/auth/signin/SignInView'
import SignUpView from "../components/auth/signup/SignUpView";
import SettingsView from '../components/profile/settings/SettingsView'
import BrowseView from '../components/browse/BrowseView'
import BandProfile from '../components/band/BandProfile'
import CommunityView from '../components/community/CommunityView'

export const Routing = (props) => {
    const currentUser = useContext(UserContext);

    const blockIfAuth = (navigateToView) => {
        return currentUser && currentUser.isAuthenticated ? BrowseView : navigateToView
    }

    const blockIfNotAuth = (navigateToView) => {
        return currentUser && currentUser.isAuthenticated ? navigateToView : SignInView
    }

    return (
      <Router>
        {props.children}
        <Switch>
          <Route
            exact
            path={RoutingPath.communityView}
            component={CommunityView}
          />
          <Route exact path={RoutingPath.profileView} component={ProfileView} />
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
          <Route exact path={RoutingPath.settingsView} component={blockIfNotAuth(SettingsView)}/>
          <Route exact path={RoutingPath.bandView} component={BandProfile} />
          <Route component={BrowseView} />
        </Switch>
      </Router>
    );
}