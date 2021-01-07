import React, { Component } from 'react'
import PseudoButton from '../button/button'
import Context from '../../context/taxhub-context'
import FormInput from '../../components/form-input/form-input'
import EntityApiService from '../../services/entity-api-service'
import './create-entities-form.css'


export default class CreateEntityForm extends Component {
  static contextType = Context

  state = {
    error: null
  }

  handleSubmitForm = async ev => {
    ev.preventDefault()
    this.setState({ error: null })
    const { legalName, entityType, ein } = ev.target
  
    await EntityApiService.postEntity(this.props.clientId, legalName.value, ein.value, false, entityType.value, true)
      .then(res => {
        this.props.updateEntities(res)
        this.context.handleSetCreateNewEntity(false)
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }
  render() {
    return (
      <form className='createEntityForm' onSubmit={this.handleSubmitForm}>
        <h2>Create A New Entity</h2>
        <div className='createEntityFromBody'>
          <FormInput 
            id={'legalName'}
            name={'legalName'}
            label={`Please enter the legal name of the new entity`}
            inputClassName={'legalName'}
          /> 
          <label htmlFor='entityType' className='createEntityLabel'>Please select the entity type of the new entity</label>
          <select className='createEntitySelect' name='entityType' id='entityType'>
            <option value={'C-Corp'}>C-Corp</option>
            <option value={'S-Corp'}>S-Corp</option>
            <option value={'Partnership'}>Partnership</option>
            <option value={'LLC'}>LLC</option>
            <option value={'LLP'}>LLP</option>
          </select>
          <FormInput 
            id={'ein'}
            name={'ein'}
            label={`Please enter the EIN of the new entity`}
            inputClassName={'legaeinlName'}
          /> 
        </div>
        {this.state.error && <div className='errorMessage'>{this.state.error}</div>}
        <div className='createEntityFormButtons'>
          <PseudoButton type={'submit'} className={'createEntityFormButton'} name={'Create'} />
          <PseudoButton handleOnClick={() => this.context.handleSetCreateNewEntity(false)} className={'cancelEntityFormButton'} name={'Cancel'} />
        </div>
      </form>
    )
  }
}
