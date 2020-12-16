import React, { Component } from 'react'
import './button.css'

export default class Button extends Component {
  static defaultProps = {
    className: 'button',
    type: 'button',
    handleOnClick: () => {}
  }

  render() {
    return (
      <button type={this.props.type} onClick={this.props.handleOnClick} className={this.props.className}>{this.props.name}</button>
    )
  }
}
