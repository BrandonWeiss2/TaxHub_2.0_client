import React, { Component } from 'react';
import Header from '../../components/header/header';
import Nav from '../../components/nav/nav';
import Context from '../../context/taxhub-context';
import ClientApiService from '../../services/client-api-service';
import EngagementApiService from '../../services/engagement-api-service';
import EngagementsBodyHeader from '../../components/body-headers/engagements-body-header/engagements-body-header';
import EngagementCard from '../../components/engagement-card/engagement-card';
import CreateEngagementForm from '../../components/create-engagement-form/create-engagement-form';
import CreateFilingYearForm from '../../components/create-filing-year-form/create-filing-year-form'
import './engagements-route.css';

export default class EngagementsRoute extends Component {
  static contextType = Context

  state = {
    buttons: [],
    currentClient: {},
    engagements: [], 
    createEngagment: null 
  }

  componentDidMount () {
    ClientApiService.getClientsByClientId(this.props.match.params.id)
      .then(res => {
        this.setState({
          currentClient: res,
          buttons: [{name: 'Overview', route: `overview/${this.props.match.params.id}`}, {name: 'Engagements', route: `engagements/${this.props.match.params.id}`}, {name: 'Entities', route: `entities/${this.props.match.params.id}`}, {name: 'Compliance', route: `compliance/${this.props.match.params.id}`}],
        })
      })
    EngagementApiService.getEngagementsByClientId(this.props.match.params.id)
    .then(res => {
      this.setState({
        engagements: res
      })
    })
  }
  
  renderEngagementCards = (status) => {
    return (
      this.state.engagements.map((engagement, index) => {
        if(status === engagement.engagementStatus)
        return (
          <EngagementCard 
            key={index}
            clientId={this.props.match.params.id}
            engagementId={engagement.engagementId}
            filingYear={engagement.filingYear}
            engagementStatus={engagement.engagementStatus}
            engagementType={engagement.engagementType}
          />
        )
      })
    )
  }

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
              buttons={this.state.buttons}
            />
          </nav>
          <div className='engagementsBodyHeaderContainer'>
            <br/>
            <div className='engagementsBodyHeaderWrapper'>
              <div className='engagementsBodyHeader'>
                <EngagementsBodyHeader
                  title={'Engagements'}
                  description={`View all of ${this.state.currentClient.clientName}'s engagements `}
                />
              </div>
            </div>
          </div>
          <div className='engagementsBodyContainer'>
            <br/>
            <div className='engagementsBodyWrapper'>
            {!this.context.createEngagment && !this.context.createFilingYear &&
            <>
              <div className='activeEngagements'>
                <h2>Active Engagements</h2>
                {this.renderEngagementCards('active')}
              </div>
              <div className='inactiveEngagements'>
                <h2>Past Engagements</h2>
                {this.renderEngagementCards('FINAL')}
              </div>
            </>
            }
            {this.context.createEngagment &&
            <CreateEngagementForm 
              clientId={this.props.match.params.id}
            />
            }
            {this.context.createFilingYear &&
            <CreateFilingYearForm 
              clientId={this.props.match.params.id}
            />
            }
            </div>
          </div> 
        </div>
      </div>
    )
  }
}
