import React, { Component } from 'react'
import NavButton from './nav-button'
import './nav.css'

export default class Nav extends Component {
  static defaultProps = {
    buttons: []
  }
  
  // renderNavButtons will take in one of the nested arrays from the nav-buttons-array as a prop from the route calling the Nav component
  renderNavButtons = (buttons) => {
    return buttons.map((button, index) =>
      <NavButton
        key={index}
        buttonName={button.name}
        handleClick={button.handleClick}
      />
    )
  }

  render() {
    return (
      <div className='innerNavContainer'>
        <ul className='navUl'>
          {this.renderNavButtons(this.props.buttons)}
        </ul>
      </div>

    )
  }
}