import React, { Component } from 'react'
import EngagementApiService from '../../services/engagement-api-service'
import Button from '../button/button'
import './active-engagements.css'

export default class ActiveEngagements extends Component {
  static defaultProps = {
    activeEngagements: [
      {
        engagementTitle: 'FY2020 Extensions',
        totalForms: 25,
        formsFinalized: 22,
      },
      {
        engagementTitle: 'FY2019 Returns',
        totalForms: 27,
        formsFinalized: 6,
      },
    ]
  }

  componentDidMount () {
    EngagementApiService.getActiveEngagements(clientId)
  }
  
  renderActiveEngagements = () => {
    let render = this.props.activeEngagements.map(engagement => {
      let precentCompleted = Math.floor(engagement.formsFinalized/engagement.totalForms * 100)
      return (
        <div className='activeEngagementItem'>
          <div className='activeEngagementTitleContainer'>
            <h3 className='activeEngagementTitle'>{engagement.engagementTitle}</h3>
            <Button 
              name={'Visit'}
              className={'visitActiveEngagementButton'}
            />
          </div>
          <div className='activeEngagementDetailsContainer'>
            <span className='activeEngagementSpan'>{engagement.formsFinalized} out of {engagement.totalForms} Completed ({precentCompleted}%)</span>
          </div>
        </div>
      )
    })
    return render;
  }

  render() {
    return (
      <div className='activeEngagementCardContainer'>
        <header className='activeEngagementHeader'>
          <h2 className='activeEngagementCardTitle'>Active Engagements</h2>
        </header>
        <div className='activeEngagementBodyContainer'>
          {this.renderActiveEngagements()}
        </div>
      </div>
    )
  }
}

