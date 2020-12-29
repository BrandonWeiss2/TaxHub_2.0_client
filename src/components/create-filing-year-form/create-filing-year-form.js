import React, { Component } from 'react'
import FormInput from '../form-input/form-input'
import PseudoButton from '../button/button'
import Context from '../../context/taxhub-context'
import EngagementApiService from '../../services/engagement-api-service'
import './create-filing-year-form.css'


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

  handleSubmitForm = ev => {
    ev.preventDefault()
    this.setState({ error: null })
    const { filingYear, yearEnd } = ev.target
    console.log('create filing year', filingYear.value, yearEnd.value)
    EngagementApiService.postFilingYear(this.props.clientId, filingYear.value, yearEnd.value)
      .then(res => {
        this.context.handleSetCreateFilingYear(false)
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
      <form className='createFilingYearForm' onSubmit={this.handleSubmitForm}>
        <h2>Add A New Filing Year</h2>
        <div className='createFilingYearFromBody'>
          <div>
            <h3>Filing Years Added:</h3>
            {this.renderFilingYears()}
          </div>
          <label className='createFilingYearLabel' htmlFor='filingYear'>Please select the new filing year you wish to add</label>
          <select className='createFilingYearSelect' id='filingYear' name={'filingYear'}>
            <option className='createFilingYearOption' value={'2022'}>2022</option>
            <option className='createFilingYearOption' value={'2021'}>2021</option>
            <option className='createFilingYearOption' value={'2020'}>2020</option>
            <option className='createFilingYearOption' value={'2019'}>2019</option>
            <option className='createFilingYearOption' value={'2018'}>2018</option>
            <option className='createFilingYearOption' value={'2017'}>2017</option>
            <option className='createFilingYearOption' value={'2016'}>2016</option>
            <option className='createFilingYearOption' value={'2015'}>2015</option>
            <option className='createFilingYearOption' value={'2014'}>2014</option>
            <option className='createFilingYearOption' value={'2013'}>2013</option>
            <option className='createFilingYearOption' value={'2012'}>2012</option>
            <option className='createFilingYearOption' value={'2011'}>2011</option>
            <option className='createFilingYearOption' value={'2010'}>2010</option>
          </select> 
          <FormInput 
            id={'yearEnd'}
            name={'yearEnd'}
            label={`Please enter the year end for the selected filing year`}
            inputClassName={'createYearEnd'}
            maxLength={10}
          /> 
        </div>
        {this.state.error && <div className='errorMessage'>{this.state.error}</div>}
        <div className='createFilingYearFormButtons'>
          <PseudoButton type={'submit'} className={'createFilingYearFormButton'} name={'Create'} />
          <PseudoButton handleOnClick={() => this.context.handleSetCreateFilingYear(false)} className={'cancelFilingYearFormButton'} name={'Cancel'} />
        </div>
      </form>
    )
  }
}
