import React, { Component } from 'react';
import TokenService from '../services/token-service'

const TaxHubContext = React.createContext({
  clientList: [],
  createClient: false,
  userFirstName: '',
  userLastName: '',
  currentClientSelected: '',
  createEngagment: '',
  createFilingYear: '',
  handleSetCreateFilingYear: () => {},
  handleSetCreateEngagement: () => {},
  setCurrentClientSelected: () => {},
  getClientById: () => {},
  handleSetUserName: () => {},
  handleSetCreateClient: () => {},
  handleLogOutClick: () => {},
  setClientList: () => {},
})
export default TaxHubContext

export class TaxHubProvider extends Component {  
  state = {
    clientList: [],
    createClient: false,
    userFirstName: 'TaxHub',
    userLastName: 'User',
    currentClientSelected: '',
    createEngagment: '',
    createFilingYear: '',
  };

  static defaultProps = {
    history: {
      push: () => {}
    },
  }

  handleSetCreateFilingYear = (val) => {
    this.setState({ createFilingYear: val })
  }

  handleSetCreateEngagement = (val) => {
    this.setState({ createEngagment: val })
  }

  setCurrentClientSelected = (client) => {
    this.setState({
      currentClientSelected: client
    })
  }

  getClientById = (id) => {
    console.log('get client by Id', this.state.clientList.find(client => client.clientId == id))
    
    return( this.state.clientList.find(client => client.clientId == id) )
  }

  handleSetUserName = (firstName, lastName) => {
    this.setState({
      userFirstName: firstName,
      userLastName: lastName,
    })
  }

  handleSetCreateClient = value => {
    this.setState({ createClient: value })
  }

  setClientList = clientList => {
    this.setState({ clientList })
  }

  handleLogoutClick = () => {
    TokenService.clearAuthToken()
  }

  render() {
    const value = {
      clientList: this.state.clientList,
      createClient: this.state.createClient,
      userFirstName: this.state.userFirstName,
      userLastName: this.state.userLastName,
      currentClientSelected: this.state.currentClientSelected,
      createEngagment: this.state.createEngagment,
      createFilingYear: this.state.createFilingYear,
      handleSetCreateFilingYear: this.handleSetCreateFilingYear,
      handleSetCreateEngagement: this.handleSetCreateEngagement,
      setCurrentClientSelected: this.setCurrentClientSelected,
      getClientById: this.getClientById,
      handleSetUserName: this.handleSetUserName,
      handleSetCreateClient: this.handleSetCreateClient,
      setClientList: this.setClientList,
      handleLogoutClick: this.handleLogoutClick,
    }
    return (
      <TaxHubContext.Provider value={value}>
        {this.props.children}
      </TaxHubContext.Provider>
    )
  }
}