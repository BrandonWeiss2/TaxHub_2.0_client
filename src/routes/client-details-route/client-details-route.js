import React, { Component } from 'react';
import Header from '../../components/header/header';
import Nav from '../../components/nav/nav';
import ClientApiService from '../../services/client-api-service'
import EngagementApiService from '../../services/engagement-api-service'
import ClientsDetailsBodyHeader from '../../components/body-headers/clients-details-body-header/clients-details-body-header'
import GeneralInformation from '../../components/general-information/general-information';
import ActiveEngagements from '../../components/active-engagements/active-engagements';
import Context from '../../context/taxhub-context'
import './client-details-route.css';

export default class ClientDetailsRoute extends Component {
  static contextType = Context
  
  state = {
    buttons: [],
    currentClient: {
      clientId: '',
      clientName: '',
      entityType: '',
      yearEnd: '',
      status: '',
      contactFirstName: '',
      contactLastName: '',
      contactPhoneNumber: '',
      contactEmail: ''
    },
    editInfo: false
  }

  componentDidMount () {
    console.log(this.props.match.params)
    ClientApiService.getClientsByClientId(this.props.match.params.id)
      .then(res => {
        this.setState({
          currentClient: res,
          buttons: [{name: 'Overview', route: `overview/${this.props.match.params.id}`}, {name: 'Engagements', route: `engagements/${this.props.match.params.id}`}, {name: 'Entities', route: `entities/${this.props.match.params.id}`}, {name: 'Settings', route: `settings/${this.props.match.params.id}`}]
        })
      })
  }

  handleUpdateEditInfo = (value) => {
    this.setState({
      editInfo: value
    })
  }

  updateCurrentClient = (client) => {
    this.setState({
      currentClient: client
    })
  }
  
  render() {
    return (
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
              buttons={this.state.buttons}
            />
          </nav>
          <div className='clientsBodyHeaderContainer'>
            <br/>
            <div className='clientsBodyHeaderWrapper'>
              <div className='clientsBodyHeader'>
                <ClientsDetailsBodyHeader
                  title={this.state.currentClient.clientName}
                  description={`An overview of ${this.state.currentClient.clientName}`}
                />
              </div>
            </div>
          </div>
          <div className='clientsDetailsBodyContainer'>
            <br/>
            <div className='clientsDetailsBodyWrapper'>
              <div className='clientsDetailsBody'>
                <GeneralInformation client={this.state.currentClient} updateEditInfo={this.handleUpdateEditInfo} editInfo={this.state.editInfo} clientId={this.props.match.params.id} updateCurrentClient={this.updateCurrentClient}/>
                {/* <ActiveEngagements clientId={this.props.match.params.id}/> */}
              </div>
            </div>
          </div> 
        </div>
      </div>
    )
  }
}
