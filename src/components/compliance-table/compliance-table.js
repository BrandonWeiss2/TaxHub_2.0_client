import React, { Component } from 'react'
import EngagementApiService from '../../services/engagement-api-service'
import JursisdictionSelect from '../jurisdiction-select/jurisdiction-select'
import StatusSelect from '../status-select/status-select'
import TableRowExtension from './table-row-extension'
import TableRowTaxReturn from './table-row-tax-return'
import Context from '../../context/taxhub-context'
import ExtendedSelect from '../extended-select/extended-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './compliance-table.css'

export default class ComplianceTable extends Component {
  static contextType = Context

  state = {
    error: null,
    complianceTableContainerClassName: 'hidden',
    complianceEditToolsClassName: 'hidden',
    addForm: false,
    editForm: false,
    entityForms: [],
    cancelEdits: false,
    totalFomrs: 0,
    formsFinalized: 0,
  }

  componentDidMount = () => {
    EngagementApiService.getFormsByEngagementAndEntity(this.props.clientId, this.props.engagementId, this.props.entityId, this.props.engagementType)
    .then(res => { 
      let totalForms = res.length
      let formsFinalized = 0
      for (let i = 0; i < totalForms; i++) {
        if(res[i].completionStatus === 'FINAL') {
          formsFinalized++
        }
      }
      this.setState({ 
        entityForms: res,
        entities: res.entities,
        formsFinalized: formsFinalized,
        totalForms: totalForms,
      })
    })
    this.setState({ entityForms: this.props.entityForms })
  }

  rerenderComplianceTable = () => {
    EngagementApiService.getFormsByEngagementAndEntity(this.props.clientId, this.props.engagementId, this.props.entityId, this.props.engagementType)
    .then(res => { 
      let totalForms = res.length
      let formsFinalized = 0
      for (let i = 0; i < totalForms; i++) {
        if(res[i].completionStatus === 'FINAL') {
          formsFinalized++
        }
      }
      this.setState({ 
        entityForms: res,
        entities: res.entities,
        formsFinalized: formsFinalized,
        totalForms: totalForms,
      })
    })
    this.setState({ entityForms: this.props.entityForms })
    this.props.rerenderEngagementCard()
  }

  renderTableColumnHeaders = () => {
    if(this.props.engagementType === 'extensions' && !this.state.editForm) {
      return (
        <div className='complianceTableColumnHeader'>
          <div className='item2'>Jurisdiction</div>
          <div className='item2'>Form Name</div>
          <div className='item2'>Due Date</div>
          <div className='item2'>Status</div>
          <div className='item1'></div>
        </div>
      ) 
    } else if(this.props.engagementType === 'extensions' && this.state.editForm) {
      return (
        <div className='complianceTableColumnHeader'>
            <div className='item2'><label htmlFor='editFormJurisdiction'>Jurisdiction</label></div>
            <div className='item2'><label htmlFor='editFormFormName'>Form Name</label></div>
            <div className='item2'><label htmlFor='editFormDueDate'>Due Date</label></div>
            <div className='item2'><label htmlFor='editFormStatus'>Status</label></div>
            <div className='item1'></div>
        </div>
      ) 
    } else if(this.props.engagementType === 'tax_returns') {
      return (
        <div className='complianceTableColumnHeader'>
          <div className='item2'>Jurisdiction</div>
          <div className='item2'>Form Name</div>
          <div className='item2'>Extended</div>
          <div className='item2'>Due Date</div>
          <div className='item2'>Extended Due Date</div>
          <div className='item2'>Status</div>
          <div className='item1'></div>
        </div>
      )
    }
  }

  renderTableRows = () => {
    if(this.state.entityForms === undefined) {
      return
    }  
    return this.state.entityForms.map((form, index) => {
      if(this.props.engagementType === 'extensions' && form !== undefined) {
        return (
          <TableRowExtension
            key={index}
            index={index}
            extensionId={form.extensionId}
            editForm={this.state.editForm}
            cancelEdits={this.state.cancelEdits}
            closeEditForm={this.handleCloseEditForm}
            clickFormDeleteButton={this.handleClickFormDeleteButton}
            rerenderComplianceTable={this.rerenderComplianceTable}
          />
        )
      } else if (this.props.engagementType === 'tax_returns' && form !== undefined) {
        return (
          <TableRowTaxReturn
            key={index}
            index={index}
            taxReturnId={form.taxReturnId}
            editForm={this.state.editForm}
            cancelEdits={this.state.cancelEdits}
            closeEditForm={this.handleCloseEditForm}
            clickFormDeleteButton={this.handleClickFormDeleteButton}
            rerenderComplianceTable={this.rerenderComplianceTable}
          />
        )
      }
    })
  }

  renderArrowButtons = () => {
    if(this.state.complianceTableContainerClassName === 'hidden') {
      return (<button onClick={() => this.handleClickArrow('complianceTableContainer')} className='complianceArrowDownButton'><FontAwesomeIcon icon={faArrowDown} className='complianceArrowDownIcon'/></button>)
    } else {
      return (<button onClick={() => this.handleClickArrow('hidden')} className='complianceArrowDownButton'><FontAwesomeIcon icon={faArrowUp} className='complianceArrowDownIcon'/></button>)
    }
  }

  handleClickArrow = (className) => {
    this.setState({ complianceTableContainerClassName: className })
  }

  renderAddFormForm = () => {
    if(this.props.engagementType === 'extensions') {
      return (
        <div className='addFormFormContainer'>
          <div className='addFormHeader'>
            <div className='item1'><label htmlFor='addFormJurisdiction'>Jurisdiction</label></div>
            <div className='item1'><label htmlFor='addFormFormName'>Form Name</label></div>
            <div className='item1'><label htmlFor='addFormDueDate'>Due Date</label></div>
            <div className='item1'><label htmlFor='addFormStatus'>Status</label></div>
          </div>
          <form  onSubmit={this.handleSubmitAddForm} id='addFormForm' className='addFormForm'>
            <div className='formItemLead'><JursisdictionSelect name='jurisdiction' id='addFormJurisdiction' className='addFormSelect' /></div>
            <div className='formItem'><input name='formName' id='addFormFormName' className='addFormInput'></input></div>
            <div className='formItem'><input name='dueDate' id='addFormDueDate' className='addFormInput'></input></div>
            <div className='formItem'><StatusSelect name='status' id='addFormStatus' className='addFormSelect' /></div>
          </form>
        </div>
      )
    } else if (this.props.engagementType === 'tax_returns') {
      return (
        <div className='addFormFormContainer'>
          <div className='addFormHeader'>
            <div className='item1'><label htmlFor='addFormJurisdiction'>Jurisdiction</label></div>
            <div className='item1'><label htmlFor='addFormFormName'>Form Name</label></div>
            <div className='item1'><label htmlFor='addFormExtended'>Extended</label></div>
            <div className='item1'><label htmlFor='addFormDueDate'>Due Date</label></div>
            <div className='item1'><label htmlFor='addFormExtendedDueDate'>Extended Due Date</label></div>
            <div className='item1'><label htmlFor='addFormStatus'>Status</label></div>
          </div>
          <form onSubmit={this.handleSubmitAddForm} id='addFormForm' className='addFormForm'>
            <div className='formItemLead'><JursisdictionSelect name='jurisdiction' id='addFormJurisdiction' className='addFormSelect' /></div>
            <div className='formItem'><input name='formName' id='addFormFormName' className='addFormInput'></input></div>
            <div className='formItem'><ExtendedSelect name='extended' id='addFormExtended' className='addFormSelect' /></div>
            <div className='formItem'><input name='dueDate' id='addFormDueDate' className='addFormInput'></input></div>
            <div className='formItem'><input name='extendedDueDate' id='addFormExtendedDueDate' className='addFormInput'></input></div>
            <div className='formItem'><StatusSelect name='status' id='addFormStatus' className='addFormSelect' /></div>
          </form>
        </div>
      )
    }
  }

  handleCloseEditForm = () => {
    this.handleSetStateEditForm(false)
    this.handleSetStateComplianceEditTools('hidden')
  }

  handleSetStateAddForm = (value) => {
    this.setState({ addForm: value })
  }

  handleSetStateEditForm = (value) => {
    this.setState({ editForm: value})
  }

  handleSetStateComplianceEditTools = (value) => {
    this.setState({ complianceEditToolsClassName: value })
  }

  handleClickPlus = () => {
    this.handleSetStateAddForm(true)
    this.handleSetStateComplianceEditTools('complianceEditTools')
  }
  
  handleClickEdit = () => {
    this.handleSetStateEditForm(true)
    this.handleSetStateComplianceEditTools('complianceEditTools')
  }

  handleSubmitAddForm = async event => {
    event.preventDefault()
    console.log('handleSubmitAddForm')
    this.setState({ error: null })
    const { jurisdiction, formName, dueDate, extended, extendedDueDate, status } = event.target
    if(this.props.engagementType === 'extensions') {
      await EngagementApiService.postEngagementExtension(jurisdiction.value, formName.value, dueDate.value, status.value, this.props.engagementId, this.props.entityId)
        .then(res => {
          formName.value = ''
          dueDate.value = ''
          this.handleSetStateAddForm(false)
          this.handleSetStateComplianceEditTools('hidden')
          this.setState({
            entityForms: [...this.state.entityForms, res]
          })
      })
    } else if(this.props.engagementType === 'tax_returns') {
      await EngagementApiService.postEngagementTaxReturn(jurisdiction.value, formName.value, dueDate.value, extended.value, extendedDueDate.value, status.value, this.props.engagementId, this.props.entityId)
      .then(res => {

        formName.value = ''
        dueDate.value = ''
        this.handleSetStateAddForm(false)
        this.handleSetStateComplianceEditTools('hidden')
        this.setState({
          entityForms: [...this.state.entityForms, res]
        })
      })
    }
    this.props.rerenderEngagementCard()
  }

  handleClickCross = () => {
    console.log('click cross')
    this.handleSetStateAddForm(false)
    this.handleSetStateEditForm(false)
    this.handleSetStateComplianceEditTools('hidden')
    this.setState({cancelEdits: !this.state.cancelEdits})
  }

  handleClickFormDeleteButton = async (formId, index) => {
    if(this.props.engagementType === 'extensions') {
      await EngagementApiService.deleteEngagementExtension(formId)
        .then(res => {
          let results = this.state.entityForms
          delete results[index]
          this.setState({
            entityForms: results
          })
        })
    } else if(this.props.engagementType === 'tax_returns') {
      await EngagementApiService.deleteEngagementTaxReturn(formId)
        .then(res => {
          let results = this.state.entityForms
          delete results[index]
          this.setState({
            entityForms: results
          })
        })
    }
    this.rerenderComplianceTable()
  }

  renderComplianceEditTools = () => {
    if(!this.state.addForm && !this.state.editForm) {
      return (
        <div className='complianceEditTools'>
          <button onClick={() => this.handleClickPlus()} className='compliancePlusButton'><FontAwesomeIcon icon={faPlus} className='compliancePlusIcon'/></button>
          <button onClick={() => this.handleClickEdit()} className='complianceEditButton'><FontAwesomeIcon icon={faEdit} className='complianceEditIcon'/></button>
        </div>
      )
    }
  } 

  render() {
    return (
      <div>
        <div className='complianceTableHeaderContainer'>
          <div className='complianceTableHeader'>
            <h4>{this.props.entityName}</h4>
            {this.renderArrowButtons()}
          </div>
          <div className='complianceEditToolsContainer'>
            <span>{this.state.formsFinalized} out of {this.state.totalForms} completed</span>
            {this.state.complianceTableContainerClassName !== 'hidden' &&
            <>
            {this.renderComplianceEditTools()}
            <div className={this.state.complianceEditToolsClassName}>
              {this.state.addForm && 
              <button type='submit' form='addFormForm' className='complianceCheckButton'><FontAwesomeIcon icon={faCheck} className='complianceCheckIcon'/></button>
              }
              <button onClick={() => this.handleClickCross()} className='complianceCrossButton'><FontAwesomeIcon icon={faTimes} className='complianceCrossIcon'/></button>
            </div>
            </>
            }
          </div>
        </div>
        <div>
          {this.state.addForm &&
          this.renderAddFormForm()
          }
          </div>
        {this.state.complianceTableContainer !== 'hidden' &&
        <div className={this.state.complianceTableContainerClassName}>
          {this.renderTableColumnHeaders()}
          <div className='complianceTableRowsContainer'>
            {this.renderTableRows()}
          </div>
        </div>
        }
      </div>
    )
  }
}
