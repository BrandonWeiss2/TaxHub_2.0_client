import React, { Component } from 'react';
import TokenService from '../services/token-service'

const TaxHubContext = React.createContext({
  clientList: [],
  handleLogOutClick: () => {},
  setClientList: () => {},
})
export default TaxHubContext

export class TaxHubProvider extends Component {  
  state = {
    clientList: [],
  };

  static defaultProps = {
    history: {
      push: () => {}
    },
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