import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './routes/login-route/login-route';
import Dashboard from './routes/dashboard-route/dashboard-route'
import Registration from './routes/registration-route/registration-route';
import Clients from './routes/clients-route/clients-route';
import ClientDetails from './routes/client-details-route/client-details-route';
import EngagementsRoute from './routes/engagements-route/engagementes-route';
import Landing from './routes/landing-route/landing-route';

export default class App extends Component {
  render () {
    return (
      <Switch>
        <Route
          exact
          path='/'
          component={Landing}
        />
        <Route
          exact
          path='/login'
          component={Login}
        />
        <Route
          exact
          path='/register'
          component={Registration}
        />
        <Route
          exact
          path='/dashboard'
          component={Dashboard}
        />
        <Route
          exact
          path='/clients'
          component={Clients}
        />
        <Route
          exact
          path='/overview/:id'
          component={ClientDetails}
        />
        <Route
          exact
          path='/engagements/:id'
          component={EngagementsRoute}
        />
      </Switch>
    )
  }
}