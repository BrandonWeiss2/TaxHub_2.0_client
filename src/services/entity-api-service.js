import config from '../config'
import TokenService from './token-service'

const EntityApiService = {
  // getEntity() {
  //   return fetch(`${config.API_ENDPOINT}/clients`, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `bearer ${TokenService.getAuthToken()}`,
  //     },
  //   })
  //     .then(res =>
  //       (!res.ok)
  //         ? res.json().then(event => Promise.reject(event))  
  //         : res.json()
  //     )
  // },
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
    }
}

export default EntityApiService