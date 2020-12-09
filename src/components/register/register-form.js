import React, { Component } from 'react';
import TaxHubContext from '../../context/taxhub-context';
import AuthApiService from '../../services/auth-api-service';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.png';

export default class RegisterForm extends Component {
  static contextType = TaxHubContext;

  state = { error: null }

  // handleSubmit will send the register data to the API for validation. On a succesful request, the user will be redirected to the login page
  // On a failed login attempt, the .catch will update the state with a message for the user which will be displayed on screen using conditional rendering
  handleSubmit = event => {
    event.preventDefault()
    const { firstName, lastName, username, password } = event.target
    AuthApiService.postUser({
      first_name: firstName.value,
      last_name: lastName.value,
      username: username.value,
      user_password: password.value,
    })
      .then(user => {
        firstName.value = ''
        lastName.value = ''
        username.value = ''
        password.value = ''
        this.props.onRegistrationSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    return(
      <div className='formContainer'>
        <div className='registerFormHeader'>
          <img className='registerLogoPic' src={Logo} alt='TaxHub logo'></img>
          <h2>Register for TaxHub</h2>
        </div>
        <form 
          className='registerForm'
          onSubmit={this.handleSubmit}
        >
          <label htmlFor='registerFormFirstName'>First name</label>
          <input className='registerFormFirstName' name='firstName' type='text' required id='registerFormFirstName'></input>
          <br></br>
          <label htmlFor='registerFormLastName'>Last name</label>
          <input className='registerFormLastName' name='lastName' type='text' required id='registerFormLastName'></input>
          <br></br>
          <label htmlFor='registerFormUsername'>Username</label>
          <input className='registerFormUsername' name='username' type='text' required id='registerFormUsername'></input>
          <br></br>
          <label htmlFor='registerFormPassword'>Password</label>
          <input className='registerFormPassword' name='password' type='text' required id='registerFormPassword'></input>
          <br></br>
          <button type='submit' className='registerFormButton'>Register</button>
          {this.state.error && <div className='errorMessage'>{this.state.error}</div>}
        </form>
        <p className='loginLink'>
          Already have an account? <Link to={'/login'}>Login. </Link>
        </p>
      </div>
      
    )
  }
}