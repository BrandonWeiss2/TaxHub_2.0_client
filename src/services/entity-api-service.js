import config from '../config'
import TokenService from './token-service'

const EntityApiService = {
  getEntitiesByClientId(clientId) {
    return fetch(`${config.API_ENDPOINT}/entities/${clientId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(event => Promise.reject(event))  
          : res.json()
      )
  },
  postEntity(clientId, entityName, entityEIN, filer, entityType, status) {
    console.log(clientId, entityName, entityEIN, filer, entityType, status)
    return fetch(`${config.API_ENDPOINT}/entities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        client_id: clientId,
        legal_name: entityName,
        ein: entityEIN,
        filer: filer,
        entity_type: entityType,
        active: status
      })  
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(event => Promise.reject(event))  
          : res.json()
      )
  },
  updateEntity(entityId, data) {
    return fetch(`${config.API_ENDPOINT}/entities`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        entity_id: entityId,
        data: data,
      })  
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(event => Promise.reject(event))  
          : res.json()
        )
    },
    removeEntity(entityId) {
    return fetch(`${config.API_ENDPOINT}/entities`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        entity_id: entityId
      })  
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(event => Promise.reject(event))  
          : res.json()
        )
    },
}

export default EntityApiService