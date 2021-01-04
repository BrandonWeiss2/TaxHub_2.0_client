import React, { useState, useEffect } from 'react'
import JursisdictionSelect from '../jurisdiction-select/jurisdiction-select'
import StatusSelect from '../status-select/status-select'
import ExtendedSelect from '../extended-select/extended-select'
import EngagementApiService from '../../services/engagement-api-service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export default function TableRowTaxReturn(props) {
  const [jurisdictionId, setJurisdictionId] = useState()
  const [formName, setFormName] = useState()
  const [extended, setExtended] = useState()
  const [dueDate, setDueDate] = useState()
  const [extendedDueDate, setExtendedDueDate] = useState()
  const [completionStatus, setCompletionStatus] = useState()
  const [extendedValue, setExtendedValue] = useState()

  useEffect(() => {
    EngagementApiService.getTaxReturnById(props.taxReturnId)
      .then(res => {
        let extended = 'Yes'
        if(!res.extended) {
          extended = 'No'
        }
        setBaseState(res.jurisdiction_id, res.form_name, extended, res.due_date.slice(0,10), res.extended_due_date.slice(0,10), res.completion_status, res.extended)
      })
  }, [])


  useEffect(() => {
    EngagementApiService.getTaxReturnById(props.taxReturnId)
      .then(res => {
        let extendedValue = 'Yes'
        if(!res.extended) {
          extendedValue = 'No'
        }
        setBaseState(res.jurisdiction_id, res.form_name, extendedValue, res.due_date.slice(0,10), res.extended_due_date.slice(0,10), res.completion_status, res.extended)
      })
  }, [props.editForm])

  function setBaseState(jurisdictionId, formName, extended, dueDate, extendedDueDate, completionStatus, extendedValue) {
    setJurisdictionId(jurisdictionId)
    setFormName(formName)
    setExtended(extended)
    setDueDate(dueDate)
    setExtendedDueDate(extendedDueDate)
    setCompletionStatus(completionStatus)
    setExtendedValue(extendedValue)
  }

  function onInputFormNameChange (event) {
    setFormName(event.target.value)
  }

  function onInputDueDateChange (event) {
    setDueDate(event.target.value)
  }

  function onInputJursidictionIdChange (jurisdictionId) {
    setJurisdictionId(jurisdictionId)
  }

  function onInputExtendedChange (extended) {
    setExtended(extended)
  }

  function onInputCompletionStatusChange (completionStatus) {
    setCompletionStatus(completionStatus)
  }

  function onInputExtendedDueDateChange (extendedDueDate) {
    setExtended(extendedDueDate)
  }

  function handleSubmitEditForm (event) {
    event.preventDefault()
    EngagementApiService.patchEngagementTaxReturn(jurisdictionId, formName, extended, dueDate, extendedDueDate, completionStatus, props.taxReturnId)
      .then(res => {
        props.closeEditForm()
        let extendedValue = 'Yes'
        if(!res.extended) {
          extendedValue = 'No'
        }
        setBaseState(res.jurisdictionId, res.formName, extendedValue, res.dueDate.slice(0,10), res.extendedDueDate.slice(0,10), res.completionStatus)
        props.rerenderComplianceTable()
      })
  }

  function renderTableRows () {
    if(!props.editForm) {
      return (
        <div className='complianceTableRow'>
          <div className='item2'>{jurisdictionId}</div>
          <div className='item2'>{formName}</div>
          <div className='item2'>{extended}</div>
          <div className='item2'>{dueDate}</div>
          <div className='item2'>{extendedDueDate}</div>
          <div className='item2'>{completionStatus}</div>
          <div className='item1'>
          <button onClick={() => props.clickFormDeleteButton(props.taxReturnId, props.index)} className='complianceTrashButton'>
              <FontAwesomeIcon icon={faTrashAlt} className='complianceTrashIcon'/>
            </button>
          </div>
        </div>
      ) 
    } else if(props.editForm) {
      return (
        <form onSubmit={handleSubmitEditForm} id={`editFormForm${props.taxReturnId}`} className='complianceTableRow'>
          <div className='formItemLead'><JursisdictionSelect jurisdictionId={jurisdictionId} onInputJursidictionIdChange={onInputJursidictionIdChange} name='jurisdiction' id='editFormJurisdiction' className='editFormSelect' /></div>
          <div className='formItem'><input type='text' value={formName} onChange={onInputFormNameChange} name='formName' id='editFormFormName' className='editFormInput'></input></div>
          <div className='formItem'><ExtendedSelect extended={extendedValue} onInputExtendedChange={onInputExtendedChange} name='extended' id='editFormExtended' className='editFormSelect' /></div>
          <div className='formItem'><input type='text' value={dueDate.slice(0,10)} onChange={onInputDueDateChange} name='dueDate' id='editFormDueDate' className='editFormInput'></input></div>
          <div className='formItem'><input type='text' value={extendedDueDate.slice(0,10)} onChange={onInputExtendedDueDateChange} name='extendedDueDate' id='editFormExtendedDueDate' className='editFormInput'></input></div>
          <div className='formItem'><StatusSelect completionStatus={completionStatus} onInputCompletionStatusChange={onInputCompletionStatusChange} name='status' id='editFormStatus' className='editFormSelect' /></div>
          <div className='formItemButton'>
            <button type='submit' form={`editFormForm${props.taxReturnId}`} className='complianceSubmitEditButton'>
              <FontAwesomeIcon icon={faCheck} className='complianceSubmitEditIcon'/>
            </button>
          </div>
        </form>
      ) 
    }
  }

  return (
    renderTableRows()
  )
}
