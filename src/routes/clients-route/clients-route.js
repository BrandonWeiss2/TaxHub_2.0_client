import React, { Component } from 'react'
import ClientApiService from '../../services/client-api-service';
import Context from '../../context/taxhub-context';
import Header from '../../components/header/header'
import Nav from '../../components/nav/nav'
import ClientsBodyHeader from '../../components/body-headers/clients-body-header/clients-body-header'
import './clients-route.css'
import ClientsTable from '../../components/clients-table/clients-table';
import CreateClientForm from '../../components/create-client-form/create-client-form';

export default class ClientsRoute extends Component {
  static contextType = Context

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
            />
          </nav>
          <div className='clientsBodyHeaderContainer'>
            <br/>
            <div className='clientsBodyHeaderWrapper'>
              <div className='clientsBodyHeader'>
                <ClientsBodyHeader
                  title={'Clients'}
                  description={'Create and manage clients'}
                />
              </div>
            </div>
          </div>
          <div className='clientsBodyContainer'>
            <br/>
            <div className='clientsBodyWrapper'>
              <div className='clientsBody'>
                {!this.context.createClient &&
                <ClientsTable 
                  history={this.props.history}
                />
                }
                {this.context.createClient &&
                <CreateClientForm />
                }
              </div>
            </div>
          </div> 
        </div>
      </div>
    )
  }
}
