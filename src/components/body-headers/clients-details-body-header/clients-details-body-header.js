import React, { Component } from 'react'
import Context from '../../../context/taxhub-context'
import './clients-details-body-header.css'

export default class ClientsDetailsBodyHeader extends Component {
  static contextType = Context

  render() {
    return (
      <div className='bodyHeaderContainer'>
        <div className='bodyHeaderTitleContainer'>
          <h1 className='bodyHeaderTitle'>{this.props.title}</h1>
          <span className='bodyHeaderDescription'>{this.props.description}</span>
        </div>
      </div>
    )
  }
}
