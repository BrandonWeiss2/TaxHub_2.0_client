import React, { Component } from 'react'
import Logo from '../../images/logo.png'
import './landing-route.css'

export default class LandingRoute extends Component {
  handleClick = () => {
    this.props.history.push('/register')
  }

  render() {
    return (
      <div className='landing-page-container'>
        <h1>Welcome To TaxHub</h1>
        <img className='login-logo-pic' src={Logo} alt='TaxHub logo'></img>
        <h2>The centralized tax project managment tool for CPA's.</h2> 
        <div className='landing-page-description'>
          <p>This app will allow you to track all your clients, their respective entities, and their tax compliance progress from a single location.</p>
          <p>To get started, click on the button below to be redirected to the registration page. Once you have successfully created an account, you will then be able to login. After that, its up to use the app to orgainze your tax projects as needed.</p>
        </div>
        <button className='get-started-button' onClick={this.handleClick}>Get Started</button>
      </div>
    )
  }
}