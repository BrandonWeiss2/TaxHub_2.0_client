import React, { Component } from 'react'
import Button from '../../button/button'
import SearchBar from '../../search-bar/search-bar'
import Context from '../../../context/taxhub-context'
import './clients-body-header.css'

export default class ClientsBodyHeader extends Component {
  static contextType = Context

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
              <div className='addClientButton'><Button name={'Add'} /></div>
            </div>
          </div>
        </div>
        }
      </div>
    )
  }
}
