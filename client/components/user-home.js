import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class UserHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewState: 'calendar',
      displayDataType: 'both'
    }
  }

  componentDidMount() {}

  render() {
    const toggleList = () => {
      this.setState({
        viewState: 'list'
      })
    }

    const toggleCalendar = () => {
      this.setState({
        viewState: 'calendar'
      })
    }

    const showEvents = () => {
      this.setState({
        displayDataType: 'events'
      })
      console.log(this.state)
    }

    const showTasks = () => {
      this.setState({
        displayDataType: 'tasks'
      })
      console.log(this.state)
    }

    const showBoth = () => {
      this.setState({
        displayDataType: 'both'
      })
      console.log(this.state)
    }

    const viewLeaderBoard = () => {
      this.setState({
        viewState: 'leaderboard',
        displayDataType: 'leaderboard'
      })
      console.log(this.state)
    }

    const {email} = this.props

    // DATA VALUES TO BE CHANGED AS SYNCED FROM DATABASE
    const tasksData = [
      {id: 1, taskName: 'task1'},
      {id: 2, taskName: 'do laundry'}
    ]
    const eventsData = [
      {id: 1, eventName: 'event1'},
      {id: 2, eventName: 'buy watch'}
    ]
    const bothData = [
      {id: 1, entryName: 'hello'},
      {id: 2, entryName: 'bye'},
      {id: 3, entryName: 'event1'},
      {id: 4, entryName: 'buy watch'}
    ]
    const userData = [
      {id: 1, name: 'zohayb'},
      {id: 2, name: 'yasmin'},
      {id: 3, name: 'john'},
      {id: 4, name: 'burenkhuu '}
    ]

    return (
      <center>
        <div>
          <h1>Central Time</h1>
          <h3>Welcome: {email} :)</h3>
          <div className="calendar">
            <div className="ui secondary menu">
              >
              <button
                className="ui green button"
                type="button"
                onClick={() => showEvents()}
              >
                Events
              </button>
              <button
                className="ui red button"
                type="button"
                onClick={() => showTasks()}
              >
                Tasks
              </button>
              <button
                className="ui purple button"
                type="button"
                onClick={() => showBoth()}
              >
                Events + Tasks
              </button>
              <button
                className="ui blue button"
                type="button"
                onClick={() => toggleCalendar()}
              >
                Calendar View
              </button>
              <button
                className="ui blue button"
                type="button"
                onClick={() => toggleList()}
              >
                List View
              </button>
              <button
                className="ui orange button"
                type="button"
                onClick={() => viewLeaderBoard()}
              >
                View LeaderBoard
              </button>
            </div>
          </div>
        </div>
        <div>
          {this.state.viewState === 'leaderboard' ? (
            <h1>LeaderBoard</h1>
          ) : this.state.viewState === 'calendar' ? (
            <h1>Calendar</h1>
          ) : (
            <h1>List</h1>
          )}
          {this.state.displayDataType === 'tasks'
            ? tasksData.map(task => {
                return <h1 key={task.id}>{task.taskName}</h1>
              })
            : this.state.displayDataType === 'events'
              ? eventsData.map(events => {
                  return <h1 key={events.id}>{events.eventName}</h1>
                })
              : this.state.displayDataType === 'both'
                ? bothData.map(data => {
                    return <h1 key={data.id}>{data.entryName}</h1>
                  })
                : userData.map(user => {
                    return <h1 key={user.id}>{user.name}</h1>
                  })}
        </div>
      </center>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
