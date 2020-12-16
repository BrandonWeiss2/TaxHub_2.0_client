import React, { Component } from 'react';
import TokenService from '../services/token-service'

const TaxHubContext = React.createContext({
  clientList: [],
  createClient: false,
  userFirstName: '',
  userLastName: '',
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
  };

  static defaultProps = {
    history: {
      push: () => {}
    },
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
    // this.setClientList([])
    // this.setEntityList([])
    // this.setReturnList([])
  }

  render() {
    const value = {
      clientList: this.state.clientList,
      createClient: this.state.createClient,
      userFirstName: this.state.userFirstName,
      userLastName: this.state.userLastName,
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