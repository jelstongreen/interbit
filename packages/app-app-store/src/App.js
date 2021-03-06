import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Grid, Col, Row } from 'react-bootstrap'
import { Navigation, Footer } from 'lib-react-interbit'

import AppDirectory from './containers/AppDirectory'
import MyApps from './containers/MyApps'
import FeaturedApps from './containers/FeaturedApps'
import NotFoundPage from './containers/NotFoundPage'
import AppDetails from './containers/AppDetails'
import LogoStore from './components/LogoStore'

import constants from './constants'
import './css/App.css'

export default class App extends Component {
  render() {
    const headerNav = [
      {
        title: 'Featured',
        eventKey: 'featured-apps'
      },
      {
        title: 'Apps',
        eventKey: ''
      },
      {
        title: 'Developers',
        eventKey: 'developers'
      }
    ]
    const footerNav = [
      {
        title: 'Store',
        items: [
          {
            text: 'Featured',
            to: constants.paths.FEATURED_APPS
          },
          {
            text: 'Apps',
            to: constants.paths.HOME
          },
          {
            text: 'Developers',
            to: constants.paths.DEVELOPERS
          },
          {
            text: 'Support',
            to: constants.urls.APP_IB_IO_SUPPORT
          }
        ]
      },
      {
        title: 'Platform',
        items: [
          { text: 'Accounts', to: constants.urls.APP_ACCOUNT },
          { text: 'Store', to: constants.paths.HOME }
        ]
      }
    ]

    const footerBottomLinks = [
      {
        text: 'Privacy Policy',
        to: constants.urls.APP_IB_IO_POLICY_PRIVACY
      },
      {
        text: 'Terms of Service',
        to: constants.urls.APP_IB_IO_POLICY_TOS
      }
    ]

    return (
      <div className="App ibweb app-app-store">
        <div className="ibweb-navbar-container">
          <Grid>
            <Row>
              <Col lg={10} md={9} sm={12}>
                <Navigation navItems={headerNav} logo={<LogoStore />} />
              </Col>
            </Row>
          </Grid>
        </div>

        <Grid>
          <Switch>
            <Route exact path={constants.paths.HOME} component={AppDirectory} />
            <Route exact path={constants.paths.DEVELOPERS} component={MyApps} />
            <Route
              exact
              path={constants.paths.FEATURED_APPS}
              component={FeaturedApps}
            />
            <Route path="/apps/:appName" component={AppDetails} />
            <Route component={NotFoundPage} />
          </Switch>

          <Footer
            sections={footerNav}
            isInline
            logoUrl={constants.urls.APP_INTERBIT_IO}
            bottomLinks={footerBottomLinks}
          />
        </Grid>
      </div>
    )
  }
}
