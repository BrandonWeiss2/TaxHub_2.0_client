import React, { Component } from 'react'
import './search-bar.css'

export default class SearchBar extends Component {
  render() {
    return (
      <div className='searchBarContainer'>
        <label className='searchBarLabel' htmlFor='searchBarInput'>{this.props.label}</label>
        <div className='searchBarInputWrapper'>
          <input className='searchBarInput' id='searchBarInput'></input>
        </div>
      </div>
    )
  }
}
