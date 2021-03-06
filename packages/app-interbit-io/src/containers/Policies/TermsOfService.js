import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { Markdown } from 'lib-react-interbit'

import PolicyNavigation from '../../components/PolicyNavigation'
import layout from '../../constants/layout'

const mapStateToProps = state => ({
  content: state.content.policies.termsOfService,
  sideBar: state.content.policies.sidebar
})

class TermsOfService extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { content, sideBar } = this.props
    const colLayout = layout.colLayout.developers

    const privacyContent = (
      <div className="ibweb-page policy">
        <Row>
          <Col {...colLayout}>
            <h1>{content.title}</h1>
            <Markdown markdown={content.content} className="ibweb-intro" />
          </Col>
        </Row>
      </div>
    )

    return <PolicyNavigation component={privacyContent} sideBar={sideBar} />
  }
}

export default connect(mapStateToProps)(TermsOfService)
