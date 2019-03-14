import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'
var moment = require('moment')

class UserHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewState: 'calendar',
      displayDataType: 'both',
      tasks: [],
      events: [],
      entries: [],
      leaderboard: []
    }
  }

  async componentDidMount() {
    const allEntries = await axios.get(
      `http://localhost:8080/api/entries/${this.props.user.id}`
    )
    const allTasks = await axios.get(
      `http://localhost:8080/api/entries/${this.props.user.id}`
    )
    const allEvents = await axios.get(
      `http://localhost:8080/api/entries/${this.props.user.id}`
    )
    this.setState({
      entries: allEntries.data
    })
  }

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

    const {username} = this.props

    // DATA VALUES TO BE CHANGED AS SYNCED FROM DATABASE
    // const tasksData = [
    //   {id: 1, taskName: 'task1'},
    //   {id: 2, taskName: 'do laundry'}
    // ]
    // const eventsData = [
    //   {id: 1, eventName: 'event1'},
    //   {id: 2, eventName: 'buy watch'}
    // ]
    // const bothData = [
    //   {id: 1, entryName: 'hello'},
    //   {id: 2, entryName: 'bye'},
    //   {id: 3, entryName: 'event1'},
    //   {id: 4, entryName: 'buy watch'}
    // ]
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
          <h3>Welcome: {username} :)</h3>
          <div className="calendar">
            <div className="ui secondary menu">
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
            ? this.state.entries.map(data => {
                return (
                  <div className="item" key={data.id}>
                    {data.task ? (
                      <div>
                        <h1>Entry Name: {data.entryName}</h1>
                        <div className="ui list">
                          <div className="item">
                            Entry Description: {data.entryDescription}
                          </div>
                          <div className="item">
                            Deadline Date:
                            {moment(data.task.deadlineDate).format(
                              'MMMM Do YYYY, h:mm:ss a'
                            )}
                          </div>
                          <div className="item">
                            Complete: {data.task.complete.toString()}
                          </div>
                        </div>
                        <div className="item">
                          No. of Reminders {data.reminders.length}
                        </div>
                        {data.reminders.map(reminder => {
                          return (
                            <div key={reminder.id}>
                              <div className="item">
                                Reminder Date:
                                {moment(reminder.reminderDate).format(
                                  'MMMM Do YYYY, h:mm:ss a'
                                )};
                              </div>
                              <div className="item">
                                Reminder Note: {reminder.reminderNote}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                )
              })
            : this.state.displayDataType === 'events'
              ? this.state.entries.map(data => {
                  return (
                    <div className="item" key={data.id}>
                      {data.event ? (
                        <div>
                          <h1>Entry Name: {data.entryName}</h1>
                          <div className="ui list">
                            <div className="item">
                              Entry Description: {data.entryDescription}
                            </div>
                            <div className="item">
                              Start Date:
                              {moment(data.event.eventStartDate).format(
                                'MMMM Do YYYY, h:mm:ss a'
                              )}
                            </div>
                            <div className="item">
                              End Date:
                              {moment(data.event.eventEndDate).format(
                                'MMMM Do YYYY, h:mm:ss a'
                              )}
                            </div>
                            <div className="item">
                              Location: {data.event.location}
                            </div>
                            <div className="item">
                              No. of Reminders {data.reminders.length}
                            </div>
                            {data.reminders.map(reminder => {
                              return (
                                <div key={reminder.id}>
                                  <div className="item">
                                    Reminder Date:
                                    {moment(reminder.reminderDate).format(
                                      'MMMM Do YYYY, h:mm:ss a'
                                    )};
                                  </div>
                                  <div className="item">
                                    Reminder Note: {reminder.reminderNote}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      ) : (
                        <div />
                      )}
                    </div>
                  )
                })
              : this.state.displayDataType === 'both'
                ? this.state.entries.map(data => {
                    //// EVENTUALLY MOVE TO OWN STATELESS COMPONENT - DONT FORGET lol
                    return (
                      <div className="item" key={data.id}>
                        <h1>Entry Name: {data.entryName}</h1>
                        <div className="ui list">
                          <div className="item">
                            Entry Description: {data.entryDescription}
                          </div>
                          {data.event ? (
                            <div>
                              <div className="item">
                                Start Date:
                                {moment(data.event.eventStartDate).format(
                                  'MMMM Do YYYY, h:mm:ss a'
                                )}
                              </div>
                              <div className="item">
                                End Date:
                                {moment(data.event.eventEndDate).format(
                                  'MMMM Do YYYY, h:mm:ss a'
                                )}
                              </div>
                              <div className="item">
                                Location: {data.event.location}
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="item">Not an event</div>
                            </div>
                          )}
                          {data.task ? (
                            <div>
                              <div className="item">
                                Deadline Date:
                                {moment(data.task.deadlineDate).format(
                                  'MMMM Do YYYY, h:mm:ss a'
                                )}
                              </div>
                              <div className="item">
                                Complete: {data.task.complete.toString()}
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="item">Not an task</div>
                            </div>
                          )}
                          <div className="item">
                            No. of Reminders {data.reminders.length}
                          </div>
                          {data.reminders.map(reminder => {
                            return (
                              <div key={reminder.id}>
                                <div className="item">
                                  Reminder Date:
                                  {moment(reminder.reminderDate).format(
                                    'MMMM Do YYYY, h:mm:ss a'
                                  )};
                                </div>
                                <div className="item">
                                  Reminder Note: {reminder.reminderNote}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
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
    username: state.user.username,
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  username: PropTypes.string
}
