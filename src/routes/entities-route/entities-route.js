import React, { Component } from 'react';
import Header from '../../components/header/header';
import Nav from '../../components/nav/nav';
import Context from '../../context/taxhub-context';
import ClientApiService from '../../services/client-api-service';
import EntitiesBodyHeader from '../../components/body-headers/entities-body-header/entities-body-header';
import EntityApiService from '../../services/entity-api-service';
import CreateEntityForm from '../../components/create-entity-form/create-entity-form';
import './entities-route.css';


export default class EntitiesRoute extends Component {
  static contextType = Context

  state = {
    buttons: [],
    currentClient: {},
    entities: [],
  }

  async componentDidMount () {
    await ClientApiService.getClientsByClientId(this.props.match.params.id)
      .then(res => {
        this.setState({
          currentClient: res,
          buttons: [{name: 'Overview', route: `overview/${this.props.match.params.id}`}, {name: 'Engagements', route: `engagements/${this.props.match.params.id}`}, {name: 'Entities', route: `entities/${this.props.match.params.id}`}], // {name: 'Settings', route: `settings/${this.props.match.params.id}`}
        })
      })
    await EntityApiService.getEntitiesByClientId(this.state.currentClient.clientId)
      .then(res => {
        console.log(res)
        this.setState({
          entities: res
        })
      })
  }

  handleUpdateEntities = (newEntity) => {
    let entities = this.state.entities
    entities.push(newEntity)
    this.setState({
      entities: entities
    })
  }
  
  renderEntities = () => {
    let activeEntities = this.state.entities.map((entity, index) => {
      if(entity.active) {
        return (
          <div className='entity'>
            <h3>{entity.entityName}</h3>
            <p>Entity Type: {entity.entityType}</p>
            <p>EIN: {entity.ein}</p>
            <button className='entitiesStatusUpdateButton' onClick={() => this.handleClickUpdateEntitiesStatus(entity.entityId, false, index)}>Mark Inactive</button>
          </div>
        )
      }
    })
    let inactiveEntities = this.state.entities.map((entity, index) => {
      console.log('entity', entity)
      if(!entity.active) {
        return (
          <div className='entity'>
            <h3>{entity.entityName}</h3>
            <p>Entity Type: {entity.entityType}</p>
            <p>EIN: {entity.ein}</p>
            <div className='entitiesButtonContainer'>
              <button className='entitiesStatusUpdateButton' onClick={() => this.handleClickUpdateEntitiesStatus(entity.entityId, true, index)}>Mark Active</button>
              <button className='entitiesRemoveButton' onClick={() => this.handleClickRemoveEntity(entity.entityId)}>Remove</button>
            </div>
          </div>
        )
      }
    })
    return(
      <div className='entitiesContainer'>
        <div className='activeEntitiesWrapper'>
          <h2>Active Entities:</h2>
          {activeEntities}
        </div>
        <div className='inactiveEntitiesWrapper'>
          <h2>Inactive Entities:</h2>
          {inactiveEntities}
        </div>
    </div>
    )
  }

  handleClickRemoveEntity = (entityId) => {
    EntityApiService.removeEntity(entityId)
      .then(res => {
        let entities = this.state.entities.filter(entity => entity.entityId !== entityId)
        this.setState({
          entities: entities
        })
      })
  }

  handleClickUpdateEntitiesStatus = (entityId, status, index) => {
    EntityApiService.updateEntity(entityId, status)
      .then(res => {
        let entities = this.state.entities
        entities[index] = res
        this.setState({
          entities: entities
        })
      })
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
          <div className='entitiesBodyHeaderContainer'>
            <br/>
            <div className='entitiesBodyHeaderWrapper'>
              <div className='entitiesBodyHeader'>
                <EntitiesBodyHeader
                  title={'Entities'}
                  description={`View all of ${this.state.currentClient.clientName}'s entities by filing year `}
                />
              </div>
            </div>
          </div>
          <div className='entitiesBodyContainer'>
            <br/>
            <div className='entitiesBodyWrapper'>
              {!this.context.createEntity &&
              this.renderEntities()
              }
              {this.context.createEntity &&
              <CreateEntityForm 
                clientId={this.state.currentClient.clientId}
                updateEntities={this.handleUpdateEntities}
              />
              }
            </div>
          </div> 
        </div>
      </div>
    )
  }
}
