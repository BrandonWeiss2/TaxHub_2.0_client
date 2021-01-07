import React, { Component } from 'react'
import Context from '../../../context/taxhub-context'
import Button from '../../button/button'
import './entities-body-header.css'

export default class EntitiesBodyHeader extends Component {
  static contextType = Context

  render() {
    return (
      <div className='bodyHeaderContainer'>
        <div className='bodyHeaderTitleContainer'>
          <h1 className='bodyHeaderTitle'>{this.props.title}</h1>
          <span className='bodyHeaderDescription'>{this.props.description}</span>
        </div>
        <div className='bodyHeaderFunctionContainer'>
          <div>
          </div>
          {!this.context.createEntity &&
          <div className='bodyHeaderButtonContainerEntity'> 
              <Button className='createEntityButton' handleOnClick={() => this.context.handleSetCreateNewEntity(true)} name={'New Entity'} /> 
          </div>
          }
        </div>
      </div>
    )
  }
}