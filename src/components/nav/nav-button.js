import React, { Component } from 'react';

export default class NavButton extends Component {
  handleClick = () => {
    this.props.history.push(`/${this.props.route}`)
  }

  render() {
    return (
      <li className='navButtonLi'>
        <span className='navButton' onClick={this.handleClick}>{this.props.name}</span>
      </li>
    )
  }
}