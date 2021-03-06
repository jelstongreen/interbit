import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import PropTypes from 'prop-types'
import { SubmissionError } from 'redux-form'

import { actionCreators as myProjectsActionCreators } from '../interbit/my-projects/actions'
import { actionCreators as projectActionCreators } from '../interbit/project/actions'

import ProjectPackages from '../components/ProjectPackages'
import ProjectDetailsForm from '../components/ProjectDetailsForm'

import { getExploreChainState } from '../redux/exploreChainReducer'

const mapStateToProps = (state, ownProps) => {
  const { state: chainState } = getExploreChainState(state)
  if (!chainState) {
    return {
      project: {}
    }
  }

  const urlParamProjectAlias = ownProps.match.params.projectAlias

  const project = {
    projectAlias: urlParamProjectAlias,
    name: chainState.myProjects[urlParamProjectAlias].projectName,
    description: chainState.myProjects[urlParamProjectAlias].description,
    faIcon: chainState.myProjects[urlParamProjectAlias].icon,
    launchUrl: chainState.myProjects[urlParamProjectAlias].launchUrl
  }
  return {
    project
  }
}

const mapDispatchToProps = dispatch => ({
  blockchainDispatch: action => dispatch('myProjects', action)
})

export class ProjectDetails extends Component {
  static propTypes = {
    project: PropTypes.shape({
      projectAlias: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      faIcon: PropTypes.string,
      launchUrl: PropTypes.string
    }),
    blockchainDispatch: PropTypes.func.isRequired
  }

  static defaultProps = {
    project: {
      name: '',
      description: '',
      faIcon: 'fa-coffee',
      launchUrl: ''
    }
  }

  submit = formValues => {
    try {
      const {
        blockchainDispatch,
        project: { projectAlias, name: originalName }
      } = this.props

      const action = projectActionCreators.updateProject({
        ...formValues,
        projectName: formValues.name || originalName,
        icon: formValues.faIcon
      })

      const forwardAction = myProjectsActionCreators.forwardActionToProject({
        projectAlias,
        action
      })

      console.log(`dispatching action: ${JSON.stringify(forwardAction)}`)
      blockchainDispatch(forwardAction)
    } catch (error) {
      console.log(error)
      throw new SubmissionError({
        _error: error.message
      })
    }
  }

  openInBrowser = () => {
    const {
      project: { launchUrl }
    } = this.props
    if (launchUrl) {
      window.location = launchUrl
    }
  }

  render() {
    const { project } = this.props

    return (
      <Row className="Project-details">
        <Col sm={1}>
          <LinkContainer to="/projects" className="Project-back">
            <Button>
              <i className="fa fa-angle-double-left" />
            </Button>
          </LinkContainer>
        </Col>
        <Col sm={11} md={10} lg={9}>
          <Row>
            <Col sm={8} md={9}>
              <h3>{project.name}</h3>
            </Col>
            <Col sm={4} md={3}>
              <Button
                disabled={!project.launchUrl}
                onClick={this.openInBrowser}
                bsStyle="default"
                className="Secondary-button Open pull-right">
                Open in Browser
              </Button>
            </Col>
          </Row>
          <Row className="Project-form-row">
            {/* TODO: Use the PromiseMiddleware to politely disable the form when chain is loading */}
            {!!project.name && (
              <div>
                <ProjectDetailsForm
                  form={project.name}
                  submitText="Save Changes"
                  name={project.name}
                  description={project.description}
                  onSubmit={this.submit}
                  initialValues={project}
                />
              </div>
            )}
          </Row>
          <ProjectPackages />
        </Col>
      </Row>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails)
