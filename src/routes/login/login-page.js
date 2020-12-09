import React, { Component } from 'react';
import LoginForm from '../../components/login/login-form';
import './login-page.css';

export default class LoginPage extends Component {
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