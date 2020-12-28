import React, { useState, useEffect } from 'react'
import JursisdictionSelect from '../jurisdiction-select/jurisdiction-select'
import StatusSelect from '../status-select/status-select'
import EngagementApiService from '../../services/engagement-api-service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export default function TableRowExtension(props) {
  const [jurisdictionId, setJurisdictionId] = useState()
  const [formName, setFormName] = useState()
  const [dueDate, setDueDate] = useState()
  const [completionStatus, setCompletionStatus] = useState()

  useEffect(() => {
    setBaseState(props.extension.jurisdictionId, props.extension.formName, props.extension.dueDate.slice(0,10), props.extension.completionStatus)
  }, [])

  useEffect(() => {
    setBaseState(props.extension.jurisdictionId, props.extension.formName, props.extension.dueDate.slice(0,10), props.extension.completionStatus)
  }, [props.editForm])

  function setBaseState(jurisdictionId, formName, dueDate, completionStatus) {
    setJurisdictionId(jurisdictionId)
    setFormName(formName)
    setDueDate(dueDate)
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

  function onInputCompletionStatusChange (completionStatus) {
    setCompletionStatus(completionStatus)
  }

  function handleSubmitEditForm (event) {
    event.preventDefault()
    EngagementApiService.patchEngagementExtension(jurisdictionId, formName, dueDate, completionStatus, props.extension.extensionId)
      .then(res => {
        props.closeEditForm()
        setBaseState(res.jurisdictionId, res.formName, res.dueDate.slice(0,10), res.completionStatus)
        props.rerenderEngagements()
      })
  }

  function renderTableRows () {
    if(!props.editForm) {
      return (
        <div className='complianceTableRow'>
          <div className='item2'>{jurisdictionId}</div>
          <div className='item2'>{formName}</div>
          <div className='item2'>{dueDate}</div>
          <div className='item2'>{completionStatus}</div>
          <div className='item1'>
            <button onClick={() => props.clickFormDeleteButton(props.extension.extensionId, props.index)} className='complianceTrashButton'>
              <FontAwesomeIcon icon={faTrashAlt} className='complianceTrashIcon'/>
            </button>
          </div>
        </div>
      ) 
    } else if(props.editForm) {
      return (
        <form onSubmit={handleSubmitEditForm} id={`editFormForm${props.extension.extensionId}`} className='complianceTableRow'>
          <div className='formItemLead'><JursisdictionSelect jurisdictionId={jurisdictionId} onInputJursidictionIdChange={onInputJursidictionIdChange} name='jurisdiction' id='editFormJurisdiction' className='editFormSelect' /></div>
          <div className='formItem'><input type='text' value={formName} onChange={onInputFormNameChange} name='formName' id='editFormFormName' className='editFormInput'></input></div>
          <div className='formItem'><input type='text' value={dueDate} onChange={onInputDueDateChange} name='dueDate' id='editFormDueDate' className='editFormInput'></input></div>
          <div className='formItem'><StatusSelect completionStatus={completionStatus} onInputCompletionStatusChange={onInputCompletionStatusChange} name='status' id='editFormStatus' className='editFormSelect' /></div>
          <div className='formItemButton'>
            <button type='submit' form={`editFormForm${props.extension.extensionId}`} className='complianceSubmitEditButton'>
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
