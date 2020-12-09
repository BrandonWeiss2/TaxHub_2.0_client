import React, { Component, useEffect } from 'react'
import ClientApiService from '../../services/client-api-service';
import TaxHubContext from '../../context/taxhub-context';
import ClientCard from '../../components/client-card/client-card'
import Header from '../../components/header/header'
import Nav from '../../components/nav/nav'
import { navButtonsArr } from '../../components/nav/nav-buttons-array'
import './dashboard.css'

export default class Dashboard extends Component {
  // Is there a way to add a box-shadow effect to the bottom of the sticky nav bar when it becomes "stuck", or the page has detected it has been scrolled.
  static contextType = TaxHubContext;

  componentDidMount() {
    ClientApiService.getClients()
      .then(this.context.setClientList)
  };

  renderClientCards = (clients) => {
    return clients.map((client, index) => 
      <ClientCard
        key={index}
        name={client.clientName}
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
                buttons={navButtonsArr[0]}
              />
            </nav>
            <div className='dashboardBodyContainer'>
              <div className='buffer'>k</div>
              <div className='dashboardBody'>
                <div className='dashboardClientCards'>
                  {this.renderClientCards(this.context.clientList)}
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
