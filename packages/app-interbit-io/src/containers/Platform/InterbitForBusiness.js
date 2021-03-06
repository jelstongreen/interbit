import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Media } from 'react-bootstrap'
import { Card, Divider, LinkBar, Markdown, Quote } from 'lib-react-interbit'

import Navigation from '../../components/Navigation'
import layout from '../../constants/layout'

const mapStateToProps = state => ({
  content: state.content.platform.ibForBusiness,
  linkBarContent: state.content.linkBars
})

class InterbitForBusiness extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { content, linkBarContent } = this.props
    const colLayout = layout.colLayout.default

    const forBusinessContent = (
      <div className="ibweb-page">
        <Row>
          <Col md={12}>
            <img
              className="ibweb-image-full-width bleed"
              src={content.headerImage}
              alt={content.title}
            />
          </Col>
        </Row>

        <Row className="ibweb-mg-md-scr-xs">
          <Col {...colLayout}>
            <h1>{content.title}</h1>
            <Markdown
              markdown={content.intro.content}
              className="ibweb-intro"
            />
          </Col>
        </Row>

        <Row className="ibweb-mg-xx-lg ibweb-mg-md-scr-xs">
          {content.intro.cards.map((c, i) => (
            <Col key={c.title} md={6} lg={4} lgOffset={i % 2 === 0 ? 2 : 0}>
              <Card {...c} className="sm" />
            </Col>
          ))}
        </Row>

        <Row className="ibweb-mg-xx-lg">
          <Col {...colLayout}>
            <LinkBar {...linkBarContent.shareWithFriend} />
          </Col>
        </Row>

        <Row className="ibweb-mg-xx-lg">
          <Col {...colLayout}>
            <h2>{content.privacy.title}</h2>
            <Markdown
              markdown={content.privacy.content}
              className="ibweb-intro"
            />
          </Col>
        </Row>

        <Row className="ibweb-mg-xx-lg">
          <Col {...colLayout}>
            <Quote {...content.quoteBTL} />
          </Col>
        </Row>

        <Row className="ibweb-mg-md-scr-xs">
          <Col {...colLayout}>
            {content.consortia.logos.map(l => (
              <div key={l.alt} className="logo-third">
                <img
                  src={l.image}
                  alt={l.alt}
                  className="ibweb-image-full-width"
                />
              </div>
            ))}
          </Col>
        </Row>

        <Row className="ibweb-mg-xx-lg">
          <Col {...colLayout}>
            <h2>{content.consortia.title}</h2>
            <Markdown
              markdown={content.consortia.content}
              className="ibweb-intro"
            />
          </Col>
        </Row>

        <Row className="ibweb-mg-xx-lg">
          <Col {...colLayout}>
            <LinkBar {...linkBarContent.requestDemo} />
          </Col>
        </Row>

        <Row className="ibweb-mg-md-scr-xs">
          <Col {...colLayout}>
            <h2>{content.getStarted.title}</h2>
            <Markdown
              markdown={content.getStarted.content}
              className="ibweb-intro"
            />
          </Col>
        </Row>

        <Row className="logos">
          {content.logos.map((l, i) => (
            <Col
              key={l.alt}
              xs={6}
              md={6}
              lg={4}
              lgOffset={i % 2 === 0 ? 2 : 0}>
              <img
                src={l.image}
                alt={l.alt}
                className="ibweb-image-full-width"
              />
            </Col>
          ))}
        </Row>

        <Row className="ibweb-mg-xx-lg">
          <Col {...colLayout}>
            <Markdown
              markdown={content.getStarted.secondPara}
              className="ibweb-intro"
            />
          </Col>
        </Row>

        <Row>
          <Col {...colLayout}>
            <Quote {...content.quoteHowyl} />
          </Col>
        </Row>

        <Row className="ibweb-mg-xx-lg">
          <Col {...colLayout}>
            <h2>{content.enterpriseScale.title}</h2>
            <Markdown
              markdown={content.enterpriseScale.content}
              className="ibweb-intro"
            />
          </Col>
        </Row>

        <Row className="ibweb-mg-xx-lg">
          <Col {...colLayout}>
            <div className="ibweb-quote">
              {content.quoteETH.content}
              <Divider />
              <Media>
                <Media.Left>
                  <div className="img-container">
                    <img
                      src={content.quoteETH.image}
                      alt={content.quoteETH.author}
                    />
                  </div>
                </Media.Left>
                <Media.Body>
                  {content.quoteETH.callToActions.map(c => (
                    <p key={c.text}>
                      <a href={c.to}>{c.text}</a>
                    </p>
                  ))}
                </Media.Body>
              </Media>
            </div>
          </Col>
        </Row>

        <Row className="ibweb-mg-xx-lg">
          <Col {...colLayout}>
            <LinkBar {...linkBarContent.requestDemo} />
          </Col>
        </Row>
      </div>
    )

    return (
      <Navigation
        container={forBusinessContent}
        className="app-interbit-io ib-for-business"
      />
    )
  }
}

export default connect(mapStateToProps)(InterbitForBusiness)
