import React, { Component } from 'react'
import FormInput from '../form-input/form-input'
import PseudoButton from '../button/button'
import Context from '../../context/taxhub-context'
import ClientApiService from '../../services/client-api-service'
import EntityApiService from '../../services/entity-api-service'
import './create-filing-year-form.css'
import EngagementApiService from '../../services/engagement-api-service'

export default class CreateFilingYearForm extends Component {
  static contextType = Context

  state = { 
    error: null,
    filingYears: [] 
  };

  componentDidMount = () => {
    EngagementApiService.getFilingYears(this.props.clientId) 
      .then(res => {
        console.log('filing years', res)
        this.setState({ filingYears: res })
      })
  }

  handleSubmitForm = async ev => {
    ev.preventDefault()
    this.setState({ error: null })
    const { clientName, clientEIN, clientEntityType, clientYearEnd, clientStatus } = ev.target
    let clientId = null
  
    await ClientApiService.postClient(clientName.value, clientEntityType.value, clientYearEnd.value, clientStatus.value)
      .then(res => {
        clientId = res.clientId
        this.context.handleSetCreateClient(false)
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
    await EntityApiService.postEntity(clientId, clientName.value, clientEIN.value, true, clientEntityType.value, true)
      .then(res => {
        clientName.value = ''
        clientEIN.value = ''
        clientYearEnd.value = ''
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }



  renderFilingYears = () => {
    return this.state.filingYears.map((filingYear) => {
      return (
        <div className='filingYearContainer'>
          <div>
            <span>Filing Year: </span>
            <span>{filingYear.filingYear}</span>
          </div>
          <div>
            <span>Year End: </span>
            <span>{filingYear.yearEnd.slice(5,10)}</span>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <form className='createClientForm' onSubmit={this.handleSubmitForm}>
        <h2>Add A New Filing Year</h2>
        <div className='createClientFromBody'>
          <div>
            <h3>Filing Years Added:</h3>
            {this.renderFilingYears()}
          </div>
          <label className='createClientLabel' htmlFor='clientStatus'>Please select the new filing year you wish to add</label>
          <select className='createClientSelect' id='clientStatus' name={'clientStatus'}>
            <option className='createClientOption' value={'2022'}>2022</option>
            <option className='createClientOption' value={'2021'}>2021</option>
            <option className='createClientOption' value={'2020'}>2020</option>
            <option className='createClientOption' value={'2019'}>2019</option>
            <option className='createClientOption' value={'2018'}>2018</option>
            <option className='createClientOption' value={'2017'}>2017</option>
            <option className='createClientOption' value={'2016'}>2016</option>
            <option className='createClientOption' value={'2015'}>2015</option>
            <option className='createClientOption' value={'2014'}>2014</option>
            <option className='createClientOption' value={'2013'}>2013</option>
            <option className='createClientOption' value={'2012'}>2012</option>
            <option className='createClientOption' value={'2011'}>2011</option>
            <option className='createClientOption' value={'2010'}>2010</option>
          </select> 
          <FormInput 
            id={'clienEIN'}
            name={'clientEIN'}
            label={`Please enter the year end for the selected filing year`}
            inputClassName={'createClientInputEIN'}
            maxLength={10}
            pattern={'[0-9]{2}+[-]{1}+[0-9]{2}'}
          /> 
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
