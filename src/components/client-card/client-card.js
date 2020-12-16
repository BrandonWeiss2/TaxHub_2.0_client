import React, { Component } from 'react';
import Button from '../button/button'
import './client-card.css';

export default class ClientCard extends Component {
  handleClickVisit = () => {
    this.props.history.push(`/overview/${this.props.clientId}`)
  }

  render() {
    return (
      <div className='clientCardContainer'>
        <div className='clientCardHeader'>
          <span className='clientCardName'>{this.props.name}</span>
          <Button 
            name={'Visit'}
            handleOnClick={this.handleClickVisit}
          />
        </div>
        <div className='clientCardBody'>
          <span className='clientCardEntity'>Entity Type: {this.props.entityType}</span>
          <span className='clientCardYear'>Year End: {this.props.yearEnd}</span>
        </div> 
      </div>
    )
  }
}
