import React, {useEffect, useContext} from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RoutingPath from './RoutingPath'
import {ProfileView} from '../view/ProfileView'
import {LoggedOutView} from '../view/LoggedOutView'
import {SettingsView} from '../view/SettingsView'
import {BrowseView} from '../view/BrowseView'
import {BandView} from '../view/BandView'
import {CommunityView} from '../view/CommunityView'

export const Routing = (props) => {
    return(
        <Router>
        {props.children}
            <Switch>
                <Route exact path={RoutingPath.profileView} component={ProfileView}/>
                <Route exact path={RoutingPath.settingsView} component={SettingsView}/>
                <Route exact path={RoutingPath.browseView} component={BrowseView}/>
                <Route exact path={RoutingPath.bandView} component={BandView}/>
                <Route exact path={RoutingPath.communityView} component={CommunityView}/>
                <Route component={LoggedOutView}/>
            </Switch>
        </Router>
    )
}