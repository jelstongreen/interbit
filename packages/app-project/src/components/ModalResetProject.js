import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, FormControl } from 'react-bootstrap'
import { ContentBar, IconButton, ModalWrapper } from 'lib-react-interbit'

import modalNames from '../constants/modalNames'

export default class ModalResetProject extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
    image: PropTypes.string
  }

  static defaultProps = {
    image: undefined
  }

  render() {
    const { show, toggleModal, image } = this.props

    const header = (
      <div>
        <ContentBar
          image={image}
          className="image-sm"
          title="Are you sure you want to reset (project name)?"
        />
      </div>
    )

    const body = (
      <div>
        <p>
          Explain consequence here. Resetting this project will wipe any
          existing data. This action cannot be undone.
        </p>
        <FormControl
          type="text"
          placeholder="Type project name here to confirm."
        />
        <IconButton text="Confirm" />
      </div>
    )

    const footer = (
      <div>
        <Button
          className="text-button"
          onClick={() => {
            toggleModal(modalNames.RESET_PROJECT_MODAL_NAME)
          }}>
          Cancel
        </Button>
      </div>
    )
    return (
      <ModalWrapper header={header} body={body} footer={footer} show={show} />
    )
  }
}
