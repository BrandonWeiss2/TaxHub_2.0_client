import React, { Component } from 'react';
import './client-card.css';

export default class ClientCard extends Component {
  render() {
    return (
      <div className='clientCardContainer'>
        <div className='clientCardHeader'>
          <span className='clientCardName'>{this.props.name}</span>
          <span className='clientCardVisit'>Visit</span>
        </div>
        <div className='clientCardBody'>
          <span className='clientCardEntity'>Entity Type: C-Corp</span>
          <span className='clientCardYear'>Year End: 12/31</span>
        </div> 
      </div>
    )
  }
}
