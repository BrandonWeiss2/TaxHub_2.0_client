import config from '../config'
import TokenService from './token-service'

const ClientApiService = {
  getClients() {
    return fetch(`${config.API_ENDPOINT}/clients`, {
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
  // postClient(companyName, entityType, yearEnd) {
  //   return fetch(`${config.API_ENDPOINT}/clients`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `bearer ${TokenService.getAuthToken()}`,
  //     },
  //     body: JSON.stringify({
  //       company_name: companyName,
  //       entity_type: entityType,
  //       year_end: yearEnd,
  //     })  
  //   })
  //     .then(res =>
  //       (!res.ok)
  //         ? res.json().then(event => Promise.reject(event))  
  //         : res.json()
  //     )
  // },
  // deleteClient(cid) {
  //   return fetch(`${config.API_ENDPOINT}/clients/${cid}`, {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `bearer ${TokenService.getAuthToken()}`,
  //     }
  //   })
  //   .then(res =>
  //     (!res.ok)
  //       ? res.json().then(e => Promise.reject(e))
  //       : null
  //   )
  // },
}

export default ClientApiService