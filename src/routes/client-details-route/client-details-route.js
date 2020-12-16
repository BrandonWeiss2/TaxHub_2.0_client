import React, { Component } from 'react';
import Header from '../../components/header/header';
import Nav from '../../components/nav/nav';
import ClientApiService from '../../services/client-api-service'
import ClientsDetailsBodyHeader from '../../components/body-headers/clients-details-body-header/clients-details-body-header'
import GeneralInformation from '../../components/general-information/general-information';
import ActiveEngagements from '../../components/active-engagements/active-engagements';
import Context from '../../context/taxhub-context'
import './client-details-route.css';

export default class ClientDetailsRoute extends Component {
  static contextType = Context
  
  state = {
    buttons: [{name: 'Overview', route: 'overview/1'}, {name: 'Engagements', route: 'engagements/1'}, {name: 'Entities', route: 'entities/1'}, {name: 'Compliance', route: 'compliance/1'}],
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
    ClientApiService.getClientsByClientId(this.props.match.params.id)
      .then(res => {
        console.log('component did mount', res)
        this.setState({
          currentClient: res
        })
      })
  }

  handleUpdateEditInfo = (value) => {
    console.log('handleClickEdit')
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
    console.log('client list', this.context.clientList, this.state.currentClient)
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
                  description={`An overview of all of Big Tech Inc.'s engagements `}
                />
              </div>
            </div>
          </div>
          <div className='clientsDetailsBodyContainer'>
            <br/>
            <div className='clientsDetailsBodyWrapper'>
              <div className='clientsDetailsBody'>
                <GeneralInformation client={this.state.currentClient} updateEditInfo={this.handleUpdateEditInfo} editInfo={this.state.editInfo} clientId={this.props.match.params.id} updateCurrentClient={this.updateCurrentClient}/>
                <ActiveEngagements />
              </div>
            </div>
          </div> 
        </div>
      </div>
    )
  }
}
