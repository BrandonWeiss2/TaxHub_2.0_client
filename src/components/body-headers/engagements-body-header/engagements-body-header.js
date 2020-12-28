import React, { Component } from 'react'
import Context from '../../../context/taxhub-context'
import Button from '../../button/button'
import './engagements-body-header.css'

export default class EngagementsBodyHeader extends Component {
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
          {!this.context.createEngagment && !this.context.createFilingYear &&
          <div className='bodyHeaderButtonContainerEngagements'> 
              <Button className='createEngagementButton' handleOnClick={() => this.context.handleSetCreateEngagement(true)} name={'New_Engagement'} />
              <Button className='createFilingYearButton' handleOnClick={() => this.context.handleSetCreateFilingYear(true)} name={'New_Filing_Year'} />
          </div>
          }
        </div>
      </div>
    )
  }
}