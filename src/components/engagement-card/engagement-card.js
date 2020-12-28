import React, { Component } from 'react'
import Button from '../button/button'
import ComplianceTable from '../compliance-table/compliance-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompress } from '@fortawesome/free-solid-svg-icons'
import { faExpand } from '@fortawesome/free-solid-svg-icons'
import './engagement-card.css'
import EngagementApiService from '../../services/engagement-api-service'


export default class EngagementCard extends Component {
  state = {
    expanded: false,
    engagementBodyClassName: 'hidden',
    engagementStatus: ''
  }

  componentDidMount () {
    this.setState({ engagmentStatus: this.props.status })
  }
s
  handleClickVisit = () => {
    this.props.history.push(`/entities/${this.props.clientId}`)
  }

  handleClickExpand = () => {
    console.log('click Expand')
    this.setState({
      engagementBodyClassName: 'engagementCardBody'
    })
  }

  handleClickCompress = () => {
    console.log('click Copmress')
    this.setState({
      engagementBodyClassName: 'hidden'
    })
  }

  renderButton = () => {
    if(this.state.engagementBodyClassName === 'hidden') {
      return (<button onClick={this.handleClickExpand} className='engagementsExpandButton'><FontAwesomeIcon icon={faExpand} className='engagementsExpandIcon' /></button>)
    } else {
      return (<button onClick={this.handleClickCompress} className='engagementsExpandButton'><FontAwesomeIcon icon={faCompress} className='engagementsExpandIcon' /></button>)
    }
    
  }

  renderCompletionStatus = (status) => {
    if(status === 'FINAL') {
      return (
        <span className='statusInactiveEngagement'>Completed</span>
      )
    } else {
      console.log(this.props.entities, this.props.formsFinalized, this.props.totalForms)
      let completionStatus = Math.floor(this.props.formsFinalized/this.props.totalForms * 100)
      let completionStatusStyle = {borderColor: 'rgba(255, 0, 0, 0.5)', color: 'rgba(255, 0, 0, 0.5)'}
      if(completionStatus > 32 && completionStatus < 66) {
        completionStatusStyle = {borderColor: 'rgba(255, 166, 0, 0.5)', color: 'rgba(255, 166, 0, 0.5)'}
      } else if(completionStatus >= 66) {
        completionStatusStyle = {borderColor: '#b1e5b9', color: '#b1e5b9'}
      }
      return (
        <span style={completionStatusStyle} className='statusActiveEngagement'>{completionStatus}% Completed</span>
      )
    }
  }

  renderEngagementTitle = () => {
    let engagementType = 'Extensions'
    if (this.props.engagementType === 'tax_returns') {
      engagementType = 'Tax Returns'
    }
    return <h3 className='engagementH3'>FY{this.props.filingYear} {engagementType}</h3> 
  }

  renderEntities = () => {
    return (
      this.props.entities.map((entity, index) => {
        return(
          <ComplianceTable 
            key={index}
            engagementType={this.props.engagementType}
            engagementId={this.props.engagementId}
            entityId={entity.entityId}
            entityForms={entity.entityForms}
            totalForms={entity.totalForms}
            entityName={entity.entityName}
            formsFinalized={entity.formsFinalized}
            totalForms={entity.totalForms}
            rerenderEngagements={this.props.rerenderEngagements}
          />
        )
      })
    )
  }

  handleMarkEngagementAsFinal = async (status) => {
    await EngagementApiService.patchEngagementStatus(this.props.engagmentId, status)
      await this.props.rerenderEngagements()
      await this.setState({ engagementStatus: status })
  }

  render() {
    let statusClass = 'statusActiveEngagement'
    if(!this.state.engagementStatus) {
      statusClass = 'statusInactiveEngagement'
    }
    let precentCompleted = this.props.formsFinalized/this.props.totalForms
    return (
      <div className='engagementCardContainer'>
        <div className='engagementCardHeader'>
          <div className='engagementCardName'>
            {this.renderEngagementTitle()}
            {this.renderCompletionStatus(this.state.engagementStatus)}
          </div>
          {this.renderButton()}
        </div>
        <div className={this.state.engagementBodyClassName}>
          {this.renderEntities()}
          <div className='engagementCompleteButtonContainer'>
            {precentCompleted === 1 && this.state.engagementStatus !== 'FINAL' &&
            <Button handleOnClick={() => this.handleMarkEngagementAsFinal('FINAL')} className='engagementCompleteButton' name='Mark Engagement as Completed'/>
            }
          </div>
        </div> 
      </div>
    )
  }
}
