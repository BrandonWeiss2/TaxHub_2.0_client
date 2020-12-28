import React, { Component } from 'react'
import ClientApiService from '../../../services/client-api-service'
import Button from '../../button/button'
import SearchBar from '../../search-bar/search-bar'
import Context from '../../../context/taxhub-context'
import './clients-body-header.css'

export default class ClientsBodyHeader extends Component {
  static contextType = Context

  handleClickAddClient = () => {
    console.log('handleClickAdd', this.context.currentClientSelected)
    ClientApiService.addClientToUser(this.context.currentClientSelected)
      .then(res => {
        console.log(res)
      })
  }

  render() {
    return (
      <div className='bodyHeaderContainer'>
        <div className='bodyHeaderTitleContainer'>
          <h1 className='bodyHeaderTitle'>{this.props.title}</h1>
          <span className='bodyHeaderDescription'>{this.props.description}</span>
        </div>
        {!this.context.createClient &&
        <div className='bodyHeaderFunctionContainer'>
          <div className='bodyHeaderSearchBarWrapper'>
            <SearchBar label={'Search by Client name:'} />
          </div>
          <div className='bodyHeaderButtonContainer'>
            <div className='bodyHeaderButtonWrapper'> 
              <div onClick={() => this.context.handleSetCreateClient(true)} className='createClientButton'><Button name={'Create'} /></div>
              <div className='addClientButton'><Button handleOnClick={this.handleClickAddClient} name={'Add'} /></div>
            </div>
          </div>
        </div>
        }
      </div>
    )
  }
}
