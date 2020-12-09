import React, { Component } from 'react';

export default class NavButton extends Component {
  render() {
    const { buttonName, handleClick } = this.props
    return (
      <li className='navButtonLi'>
        <span className='navButton' onClick={handleClick}>{buttonName}</span>
      </li>
    )
  }
}