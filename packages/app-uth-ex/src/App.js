import React, { Component } from 'react'
import { Grid } from 'react-bootstrap'
import { Navigation } from 'lib-react-interbit'
import { Switch, Route } from 'react-router-dom'

import NotFound from './containers/NotFound'
import InteractiveChains from './containers/InteractiveChains'
import ExploreChain from './containers/ExploreChain'

import profilePic from './img/profilePic.png'
import './css/App.css'

export default class App extends Component {
  render() {
    const userProfile = (
      <div className="Logged-in-user">
        <img className="Profile-pic" src={profilePic} alt="profile" />
        <span>JohnSmith</span>
      </div>
    )

    return (
      <div className="App">
        <Navigation
          userAlias={userProfile}
          navItems={[
            {
              title: 'INTERACTIVE CHAINS',
              eventKey: 'chains'
            },
            {
              title: 'BLOCK EXPLORER',
              eventKey: 'explore'
            }
          ]}
        />
        <Grid>
          <Switch>
            <Route exact path="/" component={InteractiveChains} />
            <Route exact path="/chains" component={InteractiveChains} />
            <Route path="/explore" component={ExploreChain} />
            <Route component={NotFound} />
          </Switch>
        </Grid>
      </div>
    )
  }
}
