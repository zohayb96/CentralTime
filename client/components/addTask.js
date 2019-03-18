import React, {Component} from 'react'
import {connect} from 'react-redux'
import DateTimePicker from 'react-datetime-picker'

export default class AddTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      entryName: '',
      entryDescription: '',
      deadlineDate: new Date()
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeDate = this.handleChangeDate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {}

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  async handleSubmit(submitEvent) {
    submitEvent.preventDefault()
    console.log('hello')
  }

  handleChangeDate(date) {
    this.setState({
      deadlineDate: date
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label name="name">Entry Name</label>
          <input
            type="text"
            id="entryName"
            name="entryName"
            placeholder="Enter Entry Name"
            value={this.state.entryName}
            onChange={this.handleChange}
            required
          />
          <label name="address">Entry Description</label>
          <input
            type="text"
            id="entryDescription"
            name="entryDescription"
            placeholder="Add entry Desctription"
            onChange={this.handleChange}
            value={this.state.entryDescription}
            required
          />
          <label>Deadline Date</label>
          <DateTimePicker
            onChange={this.handleChangeDate}
            value={this.state.deadlineDate}
          />
          <button type="submit" className="submit">
            Add Task
          </button>
        </form>
      </div>
    )
  }
}
