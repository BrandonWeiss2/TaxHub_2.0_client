import React, { Component } from 'react'

export default class StatusSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      completionStatus: this.props.completionStatus,
    }
    this.onInputChange = this.onInputChange.bind(this)
  }

  static defaultProps = {
    onInputCompletionStatusChange: () => {}
};

  onInputChange(event) {
    this.setState({
      completionStatus: event.target.value
    });
    this.props.onInputCompletionStatusChange(event.target.value)
  }

  render() {
    return (
      <select className={this.props.className} name={this.props.name} id={this.props.id} value={this.state.completionStatus} onChange={this.onInputChange}>
        <option value='pending'>pending</option>
        <option value='started'>started</option>
        <option value='review'>review</option>
        <option value='active'>active</option>
        <option value='FINAL'>FINAL</option>
      </select>
    )
  }
}
