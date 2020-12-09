import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from './routes/register/register-page';
import Dashboard from './routes/dashboard/dashboard-page'
import Login from './routes/login/login-page';

export default class App extends Component {
  render () {
    return (
      <Switch>
        <Route
          exact
          path='/login'
          component={Login}
        />
        <Route
          exact
          path='/Register'
          component={Register}
        />
        <Route
          exact
          path='/dashboard'
          component={Dashboard}
        />
      </Switch>
    )
  }
}