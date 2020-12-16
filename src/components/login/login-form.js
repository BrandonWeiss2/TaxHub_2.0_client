import React, { Component } from 'react';
import { Link }  from 'react-router-dom';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import TaxHubContext from '../../context/taxhub-context';
import Logo from '../../images/logo.png';

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  }

  static contextType = TaxHubContext;

  state = { error: null };

  // handleSubmitJwtAuth will send the login data to the API for validation. On a succesful request, the user will be redirected to the main page
  // On a failed login attempt, the .catch will update the state with a message for the user which will be displayed on screen using conditional rendering
  handleSubmitJwtAuth = ev => {
    ev.preventDefault()
    this.setState({ error: null })
    const { username, password } = ev.target
    
    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then(res => {
        username.value = ''
        password.value = ''
        TokenService.saveAuthToken(res.authToken)
        this.context.handleSetUserName(res.firstName, res.lastName)
        this.props.onLoginSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    return(
      <div className='formContainer'>
        <form
          className='loginForm'
          onSubmit={this.handleSubmitJwtAuth}
        >
          <div className='loginFormHeader'>
            <img className='loginLogoPic' src={Logo} alt='TaxHub logo'></img>
            <h2>Sign in to TaxHub</h2>
          </div>
          <div className='loginFormBody'>
            <label htmlFor='loginFormUsername' className='loginFormLabel'>Username</label>
            <input className='loginFormInput' name='username' type='text' required id='loginFormUsername'></input>
            <br></br>
            <label htmlFor='loginFormPassword' className='loginFormLabel'>Password</label>
            <input className='loginFormInput' name='password' type='text' required id='loginFormPassword'></input>
            <br></br>
            <button type='submit' className='loginFormButton'>Sign in</button>
            {this.state.error && <div className='errorMessage'>{this.state.error}</div>}
          </div>
        </form>
        <p className='createAccountLink'>
          New to Tax Hub? <Link to={'/register'}>Create an account. </Link>
        </p>
      </div>
    )
  }
}
