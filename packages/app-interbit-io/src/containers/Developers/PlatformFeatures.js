import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { Divider, LinkBar, LinkBarSlack, Markdown } from 'lib-react-interbit'

import DeveloperNavigation from '../../components/DeveloperNavigation'
import getInterbitServices from '../../redux/getInterbitServices'
import urls from '../../constants/urls'
import layout from '../../constants/layout'

const mapStateToProps = state => ({
  interbitServices: getInterbitServices(state),
  linkBarsContent: state.content.linkBars,
  ...state.content.developers
})

class DevelopersPlatformFeatures extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { platformFeatures, linkBarsContent } = this.props
    const colLayout = layout.colLayout.developers

    const platformFeaturesContent = (
      <div className="ibweb-page dev-platform-features">
        <Row className="ibweb-mg-md">
          <Col {...colLayout}>
            <h1>{platformFeatures.title}</h1>
            <Markdown
              markdown={platformFeatures.intro.content}
              className="ibweb-intro"
            />
          </Col>
        </Row>

        <div className="sections">
          {platformFeatures.sections.map(s => (
            <Row key={s.title} className="ibweb-mg-md">
              <Col {...colLayout}>
                <h2>{s.title}</h2>
                {s.subtitle && <p className="subtitle">{s.subtitle}</p>}
                <Markdown markdown={s.content} className="ibweb-intro" />
              </Col>
            </Row>
          ))}
        </div>

        <Divider />

        <Row className="ibweb-mg-xx-lg">
          <Col {...colLayout}>
            <LinkBar {...linkBarsContent.chainArchitecture} />
            <LinkBarSlack to={urls.SUPPORT_SLACK} />
          </Col>
        </Row>
      </div>
    )

    return (
      <DeveloperNavigation
        {...this.props}
        component={platformFeaturesContent}
      />
    )
  }
}

export default connect(mapStateToProps)(DevelopersPlatformFeatures)
