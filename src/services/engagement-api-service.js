import config from '../config'
import TokenService from './token-service'

const EngagementApiService = {
  getEngagementsByClientId(clientId) {
    return fetch(`${config.API_ENDPOINT}/engagements/${clientId}`, {
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
  postEngagement(clientId, filingYearId, engagementType) {
    return fetch(`${config.API_ENDPOINT}/engagements/${clientId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        filing_year_id: filingYearId,
        engagement_type: engagementType,
        engagement_status: 'active',
      })  
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(event => Promise.reject(event))  
          : res.json()
      )
  },
  getEngagementEntityForms(engagementType, engagementId, entityId) {
    console.log('getEngagmentEntityForms', engagementType, engagementId, entityId)
    return fetch(`${config.API_ENDPOINT}/engagements/${engagementType}/${engagementId}/${entityId}`, {
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
  postEngagementExtension(jurisdiction, formName, dueDate, status, engagementId, entityId) {
    return fetch(`${config.API_ENDPOINT}/engagements/extensions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        jurisdiction_id: jurisdiction,
        form_name: formName,
        due_date: dueDate,
        completion_status: status,
        engagement_id: engagementId,
        entity_id: entityId
      })  
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(event => Promise.reject(event))  
          : res.json()
      )
  },
  patchEngagementExtension(jurisdiction, formName, dueDate, status, extensionId) {
    return fetch(`${config.API_ENDPOINT}/engagements/extensions`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        jurisdiction_id: jurisdiction,
        form_name: formName,
        due_date: dueDate,
        completion_status: status,
        extension_id: extensionId,
      })  
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(event => Promise.reject(event))  
          : res.json()
      )
  },
  deleteEngagementExtension(formId) {
    return fetch(`${config.API_ENDPOINT}/engagements/extensions`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        extension_id: formId
      })  
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(event => Promise.reject(event))  
          : res.json()
      )
  },
  postEngagementTaxReturn(jurisdiction, formName, dueDate, extended, extendedDueDate, status, engagementId, entityId) {
    console.log('post Engagement Tax Return', jurisdiction, formName, dueDate, extended, extendedDueDate, status, engagementId, entityId)
    return fetch(`${config.API_ENDPOINT}/engagements/tax_returns`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        jurisdiction_id: jurisdiction,
        form_name: formName,
        due_date: dueDate,
        extended: extended,
        extended_due_date: extendedDueDate,
        completion_status: status,
        engagement_id: engagementId,
        entity_id: entityId
      })  
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(event => Promise.reject(event))  
          : res.json()
      )
  },
  patchEngagementTaxReturn(jurisdiction, formName, extended, dueDate, extendedDueDate, status, taxReturnId) {
    return fetch(`${config.API_ENDPOINT}/engagements/tax_returns`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        jurisdiction_id: jurisdiction,
        form_name: formName,
        extended: extended,
        due_date: dueDate,
        extended_due_date: extendedDueDate,
        completion_status: status,
        tax_return_id: taxReturnId,
      })  
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(event => Promise.reject(event))  
          : res.json()
      )
  },
  deleteEngagementTaxReturn(formId) {
    return fetch(`${config.API_ENDPOINT}/engagements/tax_returns`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        tax_return_id: formId
      })  
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(event => Promise.reject(event))  
          : res.json()
      )
  },
  patchEngagementStatus(engagementId, status) {
    return fetch(`${config.API_ENDPOINT}/engagements/status`), {
      method: 'PATCH',
      header: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        engagement_id: engagementId,
        engagement_status: status
      })  
    }
  },
  getFilingYears(clientId) {
    return fetch(`${config.API_ENDPOINT}/engagements/filingYears/${clientId}`, {
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
  postFilingYear(clientId, filingYear, yearEnd) {
    return fetch(`${config.API_ENDPOINT}/engagements/filingYears/${clientId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        client_id: clientId,
        filing_year: filingYear,
        year_end: yearEnd,
      })  
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(event => Promise.reject(event))  
          : res.json()
      )
  },
}

export default EngagementApiService