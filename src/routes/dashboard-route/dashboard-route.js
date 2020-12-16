import React, { Component, useEffect } from 'react'
import ClientApiService from '../../services/client-api-service';
import TaxHubContext from '../../context/taxhub-context';
import ClientCard from '../../components/client-card/client-card'
import Header from '../../components/header/header'
import Nav from '../../components/nav/nav'
import './dashboard-route.css'

export default class DashboardRoute extends Component {
  state = {
    clientList: this.context.clientList
  }

  // Is there a way to add a box-shadow effect to the bottom of the sticky nav bar when it becomes "stuck", or the page has detected it has been scrolled.
  static contextType = TaxHubContext;

  componentDidMount() {
    ClientApiService.getClientsByUser()
      .then(res => {
        this.context.setClientList(res)
        this.setState({
          clientList: res
        })
      })
  };

  renderClientCards = (clients) => {
    return clients.map((client, index) => 
      <ClientCard
        key={index}
        clientId={client.clientId}
        name={client.clientName}
        yearEnd={client.yearEnd}
        entityType={client.entityType}
        status={client.status}
        history={this.props.history}
      />
    )
  }

  render() {
    return (
      <>
        <div className='headerNavContainer'>
          <div className='headerInnerNavContainer'>
            <div className='whiteBackground'>
              <div className='innerHeaderContainer'>
                <Header 
                  history={this.props.history}
                />
              </div>
            </div>
            <nav id='navbar' className='navContainer'>
              <Nav 
                history={this.props.history}
              />
            </nav>
            <div className='dashboardBodyContainer'>
              <br/>
              <div className='dashboardBody'>
                <div className='dashboardClientCards'>
                  {this.renderClientCards(this.state.clientList)}
                </div>
                <div className='dashboardDueSoon'>
                  <span>Forms Due Soon:</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
