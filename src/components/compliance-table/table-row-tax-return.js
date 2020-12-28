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

  useEffect(() => {
    let extendedValue = 'Yes'
    if(!props.taxReturn.extended) {
      extendedValue = 'No'
    }
    setBaseState(props.taxReturn.jurisdictionId, props.taxReturn.formName, extendedValue, props.taxReturn.dueDate.slice(0,10), props.taxReturn.extendedDueDate.slice(0,10), props.taxReturn.completionStatus)
  }, [])

  useEffect(() => {
    let extendedValue = 'Yes'
    if(!props.taxReturn.extended) {
      extendedValue = 'No'
    }
    setBaseState(props.taxReturn.jurisdictionId, props.taxReturn.formName, extendedValue, props.taxReturn.dueDate.slice(0,10), props.taxReturn.extendedDueDate.slice(0,10), props.taxReturn.completionStatus)
  }, [props.editForm])

  function setBaseState(jurisdictionId, formName, extended, dueDate, extendedDueDate, completionStatus) {
    setJurisdictionId(jurisdictionId)
    setFormName(formName)
    setExtended(extended)
    setDueDate(dueDate)
    setExtendedDueDate(extendedDueDate)
    setCompletionStatus(completionStatus)
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
    EngagementApiService.patchEngagementTaxReturn(jurisdictionId, formName, extended, dueDate, extendedDueDate, completionStatus, props.taxReturn.taxReturnId)
      .then(res => {
        props.closeEditForm()
        let extendedValue = 'Yes'
        if(!res.extended) {
          extendedValue = 'No'
        }
        setBaseState(res.jurisdictionId, res.formName, extendedValue, res.dueDate.slice(0,10), res.extendedDueDate.slice(0,10), res.completionStatus)
        props.rerenderEngagements()
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
          <button onClick={() => props.clickFormDeleteButton(props.taxReturn.taxReturnId, props.index)} className='complianceTrashButton'>
              <FontAwesomeIcon icon={faTrashAlt} className='complianceTrashIcon'/>
            </button>
          </div>
        </div>
      ) 
    } else if(props.editForm) {
      return (
        <form onSubmit={handleSubmitEditForm} id={`editFormForm${props.taxReturn.taxReturnId}`} className='complianceTableRow'>
          <div className='formItemLead'><JursisdictionSelect jurisdictionId={jurisdictionId} onInputJursidictionIdChange={onInputJursidictionIdChange} name='jurisdiction' id='editFormJurisdiction' className='editFormSelect' /></div>
          <div className='formItem'><input type='text' value={formName} onChange={onInputFormNameChange} name='formName' id='editFormFormName' className='editFormInput'></input></div>
          <div className='formItem'><ExtendedSelect extended={props.taxReturn.extended} onInputExtendedChange={onInputExtendedChange} name='extended' id='editFormExtended' className='editFormSelect' /></div>
          <div className='formItem'><input type='text' value={dueDate.slice(0,10)} onChange={onInputDueDateChange} name='dueDate' id='editFormDueDate' className='editFormInput'></input></div>
          <div className='formItem'><input type='text' value={extendedDueDate.slice(0,10)} onChange={onInputExtendedDueDateChange} name='extendedDueDate' id='editFormExtendedDueDate' className='editFormInput'></input></div>
          <div className='formItem'><StatusSelect completionStatus={completionStatus} onInputCompletionStatusChange={onInputCompletionStatusChange} name='status' id='editFormStatus' className='editFormSelect' /></div>
          <div className='formItemButton'>
            <button type='submit' form={`editFormForm${props.taxReturn.taxReturnId}`} className='complianceSubmitEditButton'>
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
