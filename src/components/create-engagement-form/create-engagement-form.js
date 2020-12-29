import React, { Component } from 'react'
import PseudoButton from '../button/button'
import Context from '../../context/taxhub-context'
import EngagementApiService from '../../services/engagement-api-service'
import './create-engagment-form.css'


export default class CreateEngagementForm extends Component {
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
    const { engagementType, filingYearId } = ev.target
  
    await EngagementApiService.postEngagement(this.props.clientId, filingYearId.value, engagementType.value)
      .then(res => {
        this.context.handleSetCreateEngagement(false)
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  handleRenderFilingYearOptions = () => {
    console.log('filing Year', this.state.filingYears)
    return this.state.filingYears.map((filingYear) => {
      return (
        <option className='createEngagementOption' value={filingYear.filingYearId}>{filingYear.filingYear}</option>
      )
    })
  }

  render() {
    return (
      <form className='createEngagementForm' onSubmit={this.handleSubmitForm}>
        <h2>Create A New Engagment</h2>
        <div className='createEngagementFromBody'>
          <label className='createEngagementLabel' htmlFor='engagementType'>Please Select The New Engagement Type:</label>
          <select className='createEngagementSelect' id='engagementType' name={'engagementType'}>
            <option className='createEngagementOption' value={'extensions'}>Extensions</option>
            <option className='createEngagementOption' value={'tax_returns'}>Tax Returns</option>
          </select>    
          <label className='createEngagementLabel' htmlFor='filingYearId'>Please Select The New Engagment's Filing Year:</label>
          <select className='createEngagementSelect' id='filingYearId' name={'filingYearId'}>
            {this.handleRenderFilingYearOptions()}
          </select>          
        </div>
        {this.state.error && <div className='errorMessage'>{this.state.error}</div>}
        <div className='createEngagementFormButtons'>
          <PseudoButton type={'submit'} className={'createEngagementFormButton'} name={'Create'} />
          <PseudoButton handleOnClick={() => this.context.handleSetCreateEngagement(false)} className={'cancelEngagementFormButton'} name={'Cancel'} />
        </div>
      </form>
    )
  }
}
