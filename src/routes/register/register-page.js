import React, { Component } from 'react';
import RegisterForm from '../../components/register/register-form';
import './register-page.css';

export default class RegistrationPage extends Component {
  static defaultProps = {
    history: {
      push: () => {}
    },
  }

  handleRegistrationSuccess = user => {
    const { history } = this.props
    history.push('/login')
  }

  render() {
    return (
      <section className='RegistrationPage'>
        <RegisterForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </section>
    )
  }
}