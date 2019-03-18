import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'
var moment = require('moment')
import {Link} from 'react-router-dom'
import addevent from './addEvent'

class UserHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewState: 'list',
      displayDataType: 'both',
      tasks: [],
      events: [],
      entries: [],
      leaderboard: [],
      viewReminders: false
    }
    this.deleteSelected = this.deleteSelected.bind(this)
  }

  async componentDidMount() {
    const allEntries = await axios.get(
      `http://localhost:8080/api/entries/${this.props.user.id}`
    )
    // const allTasks = await axios.get(
    //   `http://localhost:8080/api/entries/${this.props.user.id}`
    // )
    // const allEvents = await axios.get(
    //   `http://localhost:8080/api/entries/${this.props.user.id}`
    // )
    const topUsers = await axios.get(`http://localhost:8080/api/users`)
    this.setState({
      entries: allEntries.data,
      leaderboard: topUsers.data
    })
  }

  async deleteSelected(entryId, entries) {
    await axios.delete(`/api/entries/${entryId}`)
    const remainingEntries = entries.filter(entry => entry.id !== entryId)
    this.setState({
      entries: remainingEntries
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

    const showReminders = () => {
      console.log('showReminder pressed ')
      this.setState(prevState => ({
        viewReminders: !prevState.viewReminders
      }))
      console.log(this.state)
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
    // const userData = [
    //   {id: 1, name: 'zohayb'},
    //   {id: 2, name: 'yasmin'},
    //   {id: 3, name: 'john'},
    //   {id: 4, name: 'burenkhuu '}
    // ]

    return (
      <div>
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
                className="ui blue button"
                type="button"
                onClick={() => showReminders()}
              >
                Toggle Reminders
              </button>
              <button
                className="ui orange button"
                type="button"
                onClick={() => viewLeaderBoard()}
              >
                View LeaderBoard
              </button>
              <Link to="/addtask">Add Task</Link>
              <Link to="/addevent">Add Event</Link>
            </div>
          </div>
        </div>
        {this.state.viewState === 'calendar' ? (
          // *INSERT CALENDAR COMPONENT HERE*
          <h1>Calendar</h1>
        ) : (
          <h1 />
        )}
        {this.state.displayDataType === 'tasks'
          ? this.state.entries.map(data => {
              return (
                <div className="item" key={data.id}>
                  {data.task ? (
                    <div>
                      <div className="ui celled list">
                        <div className="item">
                          <div className="right floated content">
                            <div className="ui button">Add Reminder</div>
                            <div className="ui button">Complete</div>
                            <div
                              className="ui button"
                              onClick={() =>
                                this.deleteSelected(data.id, this.state.entries)
                              }
                            >
                              Remove
                            </div>
                          </div>
                          <div className="header">{data.entryName}</div>
                          <div className="content">
                            {data.entryDescription},
                          </div>
                          <div className="content">
                            Deadline Date:
                            {moment(data.task.deadlineDate).format(
                              'MMMM Do YYYY, h:mm:ss a'
                            )}
                          </div>
                          <div className="content">
                            Complete: {data.task.complete.toString()}
                          </div>
                          <div>
                            <div className="header">
                              No. of Reminders {data.reminders.length}
                            </div>
                            {this.state.viewReminders === false ? (
                              data.reminders.map(reminder => {
                                return (
                                  <div key={reminder.id}>
                                    <div className="content">
                                      Reminder Date:
                                      {moment(reminder.reminderDate).format(
                                        'MMMM Do YYYY, h:mm:ss a'
                                      )};
                                    </div>
                                    <div className="content">
                                      Reminder Note: {reminder.reminderNote}
                                    </div>
                                    <div
                                      className="ui button"
                                      // onClick={() =>
                                      //   this.deleteSelected(data.id, this.state.entries)
                                      // }
                                    >
                                      Remove Reminder
                                    </div>
                                  </div>
                                )
                              })
                            ) : (
                              <div />
                            )}
                          </div>
                        </div>
                      </div>
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
                        <div className="ui celled list">
                          <div className="item">
                            <div className="right floated content">
                              <div className="ui button">Add Reminder</div>
                              <div
                                className="ui button"
                                onClick={() =>
                                  this.deleteSelected(
                                    data.id,
                                    this.state.entries
                                  )
                                }
                              >
                                Remove
                              </div>
                            </div>
                            <div className="header">{data.entryName}</div>
                            <div className="content">
                              {data.entryDescription}
                            </div>
                            <div className="content">
                              Start Date:
                              {moment(data.event.eventStartDate).format(
                                'MMMM Do YYYY, h:mm:ss a'
                              )}
                            </div>
                            <div className="content">
                              End Date:{moment(data.event.eventEndDate).format(
                                'MMMM Do YYYY, h:mm:ss a'
                              )}
                            </div>
                            <div className="content">
                              Location: {data.event.location}
                            </div>
                            <div className="header">
                              No. of Reminders {data.reminders.length}
                            </div>
                            {this.state.viewReminders === false ? (
                              data.reminders.map(reminder => {
                                return (
                                  <div key={reminder.id}>
                                    <div className="content">
                                      Reminder Date:
                                      {moment(reminder.reminderDate).format(
                                        'MMMM Do YYYY, h:mm:ss a'
                                      )};
                                    </div>
                                    <div className="content">
                                      Reminder Note: {reminder.reminderNote}
                                    </div>
                                    <div
                                      className="ui button"
                                      // onClick={() =>
                                      //   this.deleteSelected(data.id, this.state.entries)
                                      // }
                                    >
                                      Remove Reminder
                                    </div>
                                  </div>
                                )
                              })
                            ) : (
                              <div />
                            )}
                          </div>
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
                  return (
                    <div className="item" key={data.id}>
                      <div className="ui list">
                        <div>
                          <div className="ui celled list">
                            {data.event ? (
                              <div className="item">
                                <div className="right floated content">
                                  <div className="ui button">Add Reminder</div>
                                  <div
                                    className="ui button"
                                    onClick={() =>
                                      this.deleteSelected(
                                        data.id,
                                        this.state.entries
                                      )
                                    }
                                  >
                                    Remove
                                  </div>
                                </div>
                                <div className="header">{data.entryName}</div>
                                <div className="content">
                                  {data.entryDescription}
                                </div>
                                {data.event ? (
                                  <div>
                                    <div className="content">
                                      Start Date:
                                      {moment(data.event.eventStartDate).format(
                                        'MMMM Do YYYY, h:mm:ss a'
                                      )}
                                    </div>
                                    <div className="content">
                                      End Date:{moment(
                                        data.event.eventEndDate
                                      ).format('MMMM Do YYYY, h:mm:ss a')}
                                    </div>
                                    <div className="content">
                                      Location: {data.event.location}
                                    </div>
                                  </div>
                                ) : (
                                  <div />
                                )}
                                <div className="header">
                                  No. of Reminders {data.reminders.length}
                                </div>
                                {this.state.viewReminders === false ? (
                                  data.reminders.map(reminder => {
                                    return (
                                      <div key={reminder.id}>
                                        <div className="content">
                                          Reminder Date:
                                          {moment(reminder.reminderDate).format(
                                            'MMMM Do YYYY, h:mm:ss a'
                                          )};
                                        </div>
                                        <div className="content">
                                          Reminder Note: {reminder.reminderNote}
                                        </div>
                                        <div
                                          className="ui button"
                                          // onClick={() =>
                                          //   this.deleteSelected(data.id, this.state.entries)
                                          // }
                                        >
                                          Remove Reminder
                                        </div>
                                      </div>
                                    )
                                  })
                                ) : (
                                  <div />
                                )}
                              </div>
                            ) : (
                              <div className="item">
                                <div className="right floated content">
                                  <div className="ui button">Add Reminder</div>
                                  <div className="ui button">Complete</div>
                                  <div
                                    className="ui button"
                                    onClick={() =>
                                      this.deleteSelected(
                                        data.id,
                                        this.state.entries
                                      )
                                    }
                                  >
                                    Remove
                                  </div>
                                </div>
                                <div className="header">{data.entryName}</div>
                                <div className="content">
                                  {data.entryDescription}
                                </div>
                                <div className="content">
                                  Deadline Date:
                                  {moment(data.task.deadlineDate).format(
                                    'MMMM Do YYYY, h:mm:ss a'
                                  )}
                                </div>
                                <div className="content">
                                  Complete: {data.task.complete.toString()}
                                </div>
                                <div>
                                  <div className="header">
                                    No. of Reminders {data.reminders.length}
                                  </div>
                                  {this.state.viewReminders === false ? (
                                    data.reminders.map(reminder => {
                                      return (
                                        <div key={reminder.id}>
                                          <div className="content">
                                            Reminder Date:
                                            {moment(
                                              reminder.reminderDate
                                            ).format(
                                              'MMMM Do YYYY, h:mm:ss a'
                                            )};
                                          </div>
                                          <div className="content">
                                            Reminder Note:{' '}
                                            {reminder.reminderNote}
                                          </div>
                                          <div
                                            className="ui button"
                                            // onClick={() =>
                                            //   this.deleteSelected(data.id, this.state.entries)
                                            // }
                                          >
                                            Remove Reminder
                                          </div>
                                        </div>
                                      )
                                    })
                                  ) : (
                                    <div />
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              : this.state.leaderboard.map((user, index) => {
                  return (
                    <h1 key={user.id}>
                      #{index + 1} Username: {user.username} - Points:
                      {user.points}
                    </h1>
                  )
                })}
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

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  username: PropTypes.string
}
