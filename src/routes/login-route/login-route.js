import React, { Component } from 'react';
import LoginForm from '../../components/login/login-form';
import './login-route.css';

export default class LoginRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {}
    },
  };

  handleLoginSuccess = () => {
    const { history } = this.props
    history.push('/dashboard')
  };

  render() {
    return (
      <section className='LoginPage'>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
    </section>
    )
  }
}