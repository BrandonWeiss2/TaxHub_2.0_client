import config from '../config'
import TokenService from './token-service'

const ClientApiService = {
  getAllClients() {
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
  getClientsByUser() {
    return fetch(`${config.API_ENDPOINT}/clients/user`, {
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
  getClientsByClientId(id) {
    return fetch(`${config.API_ENDPOINT}/clients/id/${id}`, {
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
  postClient(clientName, entityType, yearEnd, clientStatus) {
    return fetch(`${config.API_ENDPOINT}/clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        client_name: clientName,
        entity_type: entityType,
        year_end: yearEnd,
        client_status: clientStatus
      })  
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(event => Promise.reject(event))  
          : res.json()
      )
  },
  updateClientContact(id, firstName, lastName, email, phoneNumber) {
    return fetch(`${config.API_ENDPOINT}/clients/contact`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        client_id: id,
        contact_first_name: firstName,
        contact_last_name: lastName,
        contact_email: email,
        contact_phone_number: phoneNumber
      })  
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(event => Promise.reject(event))  
          : res.json()
      )
  },
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