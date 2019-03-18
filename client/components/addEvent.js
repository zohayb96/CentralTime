import React, {Component} from 'react'
import {connect} from 'react-redux'

export default class AddEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      imageUrl: '',
      address: '',
      description: ''
    }
    this.handleChange = this.handleChange.bind(this)
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

  render() {
    return (
      <div className="addCampusForm">
        <form onSubmit={this.handleSubmit}>
          <label name="name">Campus Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter a univeristy name..."
            value={this.state.name}
            onChange={this.handleChange}
            required
          />
          <label name="imageUrl">Campus Image</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            placeholder="Add a photo of the univerity"
            onChange={this.handleChange}
            value={this.state.imageUrl}
            required
          />
          <label name="address">Campus Address</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Add the university address"
            onChange={this.handleChange}
            value={this.state.address}
            required
          />
          <label name="description">Campus Description</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Add the university description"
            onChange={this.handleChange}
            value={this.state.description}
            required
          />
          <button type="submit" className="submit">
            Add Campus
          </button>
        </form>
      </div>
    )
  }
}
