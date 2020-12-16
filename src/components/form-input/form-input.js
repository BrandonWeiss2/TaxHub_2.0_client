import React, { Component } from 'react'
import './form-input.css'

export default class FormInput extends Component {
  static defaultProps = {
    labelClassName: 'generalFormLabel',
    inputClassName: 'generalFormInput'
  }

  render() {
    return (
      <>
        <label className={this.props.labelClassName} htmlFor={this.props.id}>{this.props.label}</label>
        <input className={this.props.inputClassName} id={this.props.id} name={this.props.name} maxLength={this.props.maxLength} pattern={this.props.pattern} placeholder={this.props.placeholder}></input>
      </>
    )
  }
}
