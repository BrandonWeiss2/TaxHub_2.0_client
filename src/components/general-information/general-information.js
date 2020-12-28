import React, { Component } from 'react'
import ClientApiService from '../../services/client-api-service'
import Button from '../button/button'
import FormInput from '../form-input/form-input'
import './general-information.css'

export default class GeneralInformation extends Component {
  handleSubmitEditForm = ev => {
    ev.preventDefault()
    this.props.updateEditInfo(false)
    const { firstName, lastName, email, phoneNumber } = ev.target

    ClientApiService.updateClientContact(this.props.clientId, firstName.value, lastName.value, email.value, phoneNumber.value)
      .then(res => {
        firstName.value = ''
        lastName.value = ''
        email.value = ''
        phoneNumber.values = ''
        this.props.updateCurrentClient(res)
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }
  

  render() {
    return (
      <div className='generalInformationCardContainer'>
        <header className='generalInformationHeader'>
          <h2 className='generalInformationTitle'>General Information</h2>
          {!this.props.editInfo &&
          <Button 
            name={'Edit Contact'}
            className={'editGeneralInfoButton'}
            handleOnClick={() => this.props.updateEditInfo(true)}
          />
          }
        </header>
        <div className='generalInformationBodyContainer'>
          {!this.props.editInfo &&
          <div className='generalInformationCard'>
            <span className='generalInformationSpan'>Entity Type: {this.props.client.entityType}</span>
            <span className='generalInformationSpan'>Year End: {this.props.client.yearEnd.slice(5,10)}</span>
            <span className='generalInformationSpan'>Contact: {this.props.client.contactFirstName} {this.props.client.contactLastName}</span>
            <span className='generalInformationSpan'>Email: {this.props.client.contactEmail}</span>
            <span className='generalInformationSpan'>Phone Number: {this.props.client.contactPhoneNumber}</span>
          </div>
          }
          {this.props.editInfo &&
          <form className='editGeneralInformationForm' onSubmit={this.handleSubmitEditForm}>
            <div className='generInfoInputLabelContainer'><FormInput labelClassName='editGeneralInformationlabel' inputClassName='{editGeneralInformationInput}' label={'First Name:'} id={'firstName'} htmlFor={'firstName'} name={'firstName'} placeholder={this.props.client.contactFirstName} /></div>
            <div className='generInfoInputLabelContainer'><FormInput labelClassName='editGeneralInformationlabel' inputClassName='{editGeneralInformationInput}' label={'Last Name:'} id={'lastName'} htmlFor={'lastName'} name={'lastName'} placeholder={this.props.client.contactLastName} /></div>
            <div className='generInfoInputLabelContainer'><FormInput labelClassName='editGeneralInformationlabel' inputClassName='{editGeneralInformationInput}' label={'Email:'} id={'email'} htmlFor={'email'} name={'email'} placeholder={this.props.client.contactEmail} /></div>
            <div className='generInfoInputLabelContainer'><FormInput labelClassName='editGeneralInformationlabel' inputClassName='{editGeneralInformationInput}' label={'Phone Number:'} id={'phoneNumber'} htmlFor={'phoneNumber'} name={'phoneNumber'} placeholder={this.props.client.contactPhoneNumber} /></div>
            <Button 
            name={'Submit'}
            className={'editGeneralInfoButton'}
            type={'submit'}
          />
          </form>
          }
        </div>
      </div>
    )
  }
}
