import React, { Component } from 'react'
import FormInput from '../form-input/form-input'
import PseudoButton from '../button/button'
import Context from '../../context/taxhub-context'
import ClientApiService from '../../services/client-api-service'
import EntityApiService from '../../services/entity-api-service'
import './create-client-form.css'


export default class CreateClientForm extends Component {
  static contextType = Context

  state = { error: null };

  handleSubmitForm = async ev => {
    ev.preventDefault()
    this.setState({ error: null })
    const { clientName, clientEIN, clientEntityType, clientYearEnd, clientStatus } = ev.target
    let clientId = null
  
    await ClientApiService.postClient(clientName.value, clientEntityType.value, clientYearEnd.value, clientStatus.value)
      .then(async res => {
        clientId = res.clientId
        await this.context.handleSetCreateClient(false)
        await EntityApiService.postEntity(clientId, clientName.value, clientEIN.value, true, clientEntityType.value, true)
        .then(res => {
          clientName.value = ''
          clientEIN.value = ''
          clientYearEnd.value = ''
        })
        .catch(res => {
          this.setState({ error: res.error })
        })
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    return (
      <form className='createClientForm' onSubmit={this.handleSubmitForm}>
        <h2>Create A New Client</h2>
        <div className='createClientFromBody'>
          <FormInput 
            id={'clientName'}
            name={'clientName'}
            label={`Please Enter The New Client's Full Legal Name:`}
            inputClassName={'createClientInput'}
          />
          <FormInput 
            id={'clienEIN'}
            name={'clientEIN'}
            label={`Please Enter The New Client's 9 digit EIN (XX-XXXXXXX):`}
            inputClassName={'createClientInputEIN'}
            maxLength={10}
          />
          <label className='createClientLabel' htmlFor='clientEntityType'>Please Select The New Client's Entity Type:</label>
          <select className='createClientSelect' id='clientEntityType' name={'clientEntityType'}>
            <option className='createClientOption' value={'C-Corp'}>C-Corp</option>
            <option className='createClientOption' value={'S-Corp'}>S-Corpp</option>
            <option className='createClientOption' value={'Partnership'}>Partnership</option>
            <option className='createClientOption' value={'LLP'}>LLP</option>
            <option className='createClientOption' value={'LLC'}>LLC</option>
          </select>      
          <FormInput 
            id={'clientYearEnd'}
            name={'clientYearEnd'}
            label={`Please Enter The New Client's Year-End (YYYY-MM-DD):`}
            inputClassName={'createClientInputYearEnd'}
            maxLength={5}
          />
          <label className='createClientLabel' htmlFor='clientStatus'>Please Select The New Client's Entity Type:</label>
          <select className='createClientSelect' id='clientStatus' name={'clientStatus'}>
            <option className='createClientOption' value={true}>Active</option>
            <option className='createClientOption' value={false}>Inactive</option>
          </select>  
        </div>
        {this.state.error && <div className='errorMessage'>{this.state.error}</div>}
        <div className='createClientFormButtons'>
          <PseudoButton type={'submit'} className={'createClientFormButton'} name={'Create'} />
          <PseudoButton handleOnClick={() => this.context.handleSetCreateClient(false)} className={'cancelClientFormButton'} name={'Cancel'} />
        </div>
      </form>
    )
  }
}
