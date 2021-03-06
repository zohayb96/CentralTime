import React, {Component} from 'react'
import {connect} from 'react-redux'
import DateTimePicker from 'react-datetime-picker'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

class EditTask extends Component {
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

  // componentDidMount() {
  //   this.setState({
  //     deadlineDate: this.props.location.state.data.task.deadlineDate
  //   })
  // }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  async handleSubmit(submitEvent) {
    submitEvent.preventDefault()
    try {
      const createdEntry = await axios.put(
        `/api/entries/${this.props.location.state.data.id}`,
        {
          entryName: this.state.entryName,
          entryDescription: this.state.entryDescription
        }
      )
      const createdTask = await axios.put(
        `/api/tasks/${this.props.location.state.data.task.id}`,
        {
          deadlineDate: this.state.deadlineDate
        }
      )
      this.props.history.push('/home')
    } catch (err) {
      console.log(err)
    }
  }

  handleChangeDate(date) {
    this.setState({
      deadlineDate: date
    })
  }

  render() {
    const entryData = this.props.location.state.data
    const taskData = this.props.location.state.data.task
    console.log(this.props)
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label name="name">Entry Name</label>
          <input
            type="text"
            id="entryName"
            name="entryName"
            placeholder={entryData.entryName}
            value={this.state.entryName}
            onChange={this.handleChange}
            required
          />
          <label name="address">Entry Description</label>
          <input
            type="text"
            id="entryDescription"
            name="entryDescription"
            placeholder={entryData.entryDescription}
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
            Edit Task
          </button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    username: state.user.username,
    user: state.user
  }
}

export default withRouter(connect(mapState)(EditTask))
