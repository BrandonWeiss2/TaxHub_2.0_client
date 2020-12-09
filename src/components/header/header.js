import React, { Component } from 'react';
import TaxHubContext from '../../context/taxhub-context';
import Logo from '../../images/logo.png';
import './header.css';

export default class Header extends Component {
  static contextType = TaxHubContext
  
  // will clear the authorization from the .env file. This will log th user out and direct them back to the login page
  handleLogout = () => {
    console.log('handleLogout')
    this.props.history.push('/login')
    this.context.handleLogoutClick()
  }

  render() {
    return (
      <header className='header'>
        <div className='headerLeftDiv'>
          <img className='headerLogo' src={Logo} alt='TaxHub Logo'></img>
          <span className='headerUser'>Brandon Weiss</span>
        </div>
        <div className='headerRightDiv'>
          <nav className='headerRightNav'>
            <ul className='headerNavUl'>
              <li className='headerNavLi'><span>Docs</span></li>
              <li className='headerNavLi'><span>About</span></li>
              <li className='headerNavLiLogout' onClick={() => this.handleLogout()}><span>Logout</span></li>
            </ul>
          </nav>
        </div>
      </header>
    )
  }
}