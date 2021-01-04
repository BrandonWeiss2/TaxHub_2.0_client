import React, { Component } from 'react'

export default class ExtendedSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      extended: this.props.extended,
    }
    this.onInputChange = this.onInputChange.bind(this)
    console.log(this.props.extended)
  }

  static defaultProps = {
    onInputExtendedChange: () => {}
  };

  onInputChange(event) {
    this.setState({
      extended: event.target.value
    });
    this.props.onInputExtendedChange(event.target.value)
  }

  render() {
    return (
      <select className={this.props.className} name={this.props.name} id={this.props.id} value={this.state.extended} onChange={this.onInputChange}>
        <option value={true}>Yes</option>
        <option value={false}>No</option>
      </select>
    )
  }
}
