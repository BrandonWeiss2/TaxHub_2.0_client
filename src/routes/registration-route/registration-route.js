import React, { Component } from 'react';
import RegisterForm from '../../components/registration/registration-form';
import './registration-route.css';

export default class RegistrationRoute extends Component {
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