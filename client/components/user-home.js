import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'
var moment = require('moment')
import {Link} from 'react-router-dom'

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
      viewReminders: false,
      reminders: []
    }
    this.deleteSelected = this.deleteSelected.bind(this)
    this.viewLeaderBoard = this.viewLeaderBoard.bind(this)
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

  async deleteReminder(reminderId, entries) {
    await axios.delete(`/api/reminders/${reminderId}`)
    const remainingReminders = entries.filter(entry =>
      entry.reminders.filter(reminder => reminder.id !== reminderId)
    )
    this.setState({
      reminders: remainingReminders
    })
  }

  async viewLeaderBoard() {
    // const topUsers = await axios.get(`http://localhost:8080/api/users`)
    this.setState({
      // viewState: 'leaderboard',
      displayDataType: 'leaderboard'
      // leaderboard: topUsers
    })
    console.log(this.state)
  }

  async completeTask(taskId, task) {
    console.log(taskId, task.complete, this.props.user.id)
    try {
      const res = await axios.put(`/api/tasks/${taskId}`, {
        complete: !task.complete
      })
      this.props.user.points = this.props.user.points + 10
      const allEntries = await axios.get(
        `http://localhost:8080/api/entries/${this.props.user.id}`
      )
      const topUsers = await axios.get(`http://localhost:8080/api/users`)
      const editedUser = await axios.put(`/api/users/${this.props.user.id}`, {
        points: this.props.user.points
      })
      this.setState({
        entries: allEntries.data,
        leaderboard: topUsers.data
      })
      console.log('STATE: ', this.state.leaderboard)
    } catch (err) {
      console.log(err)
    }
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
                className="ui blue button"
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
                className="ui white button"
                type="button"
                onClick={() => toggleCalendar()}
              >
                Calendar View
              </button>
              <button
                className="ui white button"
                type="button"
                onClick={() => toggleList()}
              >
                List View
              </button>
              <button
                className="ui white button"
                type="button"
                onClick={() => showReminders()}
              >
                Toggle Reminders
              </button>
              <button
                className="ui white button"
                type="button"
                onClick={() => this.viewLeaderBoard()}
              >
                View LeaderBoard
              </button>
              <button
                className="ui white button"
                type="button"
                onClick={() => this.viewLeaderBoard()}
              >
                <Link to="/addtask">Add Task</Link>
              </button>
              <button
                className="ui white button"
                type="button"
                onClick={() => this.viewLeaderBoard()}
              >
                <Link to="/addevent">Add Event</Link>
              </button>
              <button
                className="ui white button"
                type="button"
                onClick={() => this.viewLeaderBoard()}
              >
                <Link to="/addreminder">Add Reminder</Link>
              </button>
            </div>
          </div>
        </div>
        {/* // TOGGLE CALENDAR VIEW HID LIST VIEW */}
        {/* {this.state.viewState === 'calendar' ? (
          // *INSERT CALENDAR COMPONENT HERE*
          <h1>Calendar</h1>
        ) : (
          <h1 />
        )} */}
        {this.state.displayDataType === 'tasks'
          ? this.state.entries.map(data => {
              return (
                <div className="item" key={data.id}>
                  {data.task ? (
                    <div className="ui celled list">
                      <div className="item">
                        <div className="right floated content">
                          {data.task.complete === true ? (
                            <div />
                          ) : (
                            <div
                              className="ui button"
                              onClick={() =>
                                this.completeTask(data.task.id, data.task)
                              }
                            >
                              Complete
                            </div>
                          )}
                          <div
                            className="ui button"
                            onClick={() =>
                              this.deleteSelected(data.id, this.state.entries)
                            }
                          >
                            Remove
                          </div>
                          <Link
                            to={{
                              pathname: '/edittask',
                              state: {
                                data: data
                              }
                            }}
                          >
                            Edit
                          </Link>
                        </div>
                        <div className="header">{data.entryName}</div>
                        <div className="content">{data.entryDescription},</div>
                        <div className="content">
                          Deadline Date:{' '}
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
                                    Reminder Date:{' '}
                                    {moment(reminder.reminderDate).format(
                                      'MMMM Do YYYY, h:mm:ss a'
                                    )};
                                  </div>
                                  <div className="content">
                                    Reminder Note: {reminder.reminderNote}
                                  </div>
                                  <div
                                    className="ui button"
                                    onClick={() =>
                                      this.deleteReminder(
                                        reminder.id,
                                        this.state.entries
                                      )
                                    }
                                  >
                                    Remove Reminder
                                  </div>
                                  <button
                                    className="ui white button"
                                    type="button"
                                    // onClick={() => viewLeaderBoard()}
                                  >
                                    <Link
                                      to={{
                                        pathname: '/editreminder',
                                        state: {
                                          remId: reminder.id
                                        }
                                      }}
                                    >
                                      Edit Reminder
                                    </Link>
                                  </button>
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
          : this.state.displayDataType === 'events'
            ? this.state.entries.map(data => {
                return (
                  <div className="item" key={data.id}>
                    {data.event ? (
                      <div className="ui celled list">
                        <div className="item">
                          <div className="right floated content">
                            <div
                              className="ui button"
                              onClick={() =>
                                this.deleteSelected(data.id, this.state.entries)
                              }
                            >
                              Remove
                            </div>
                            <Link
                              to={{
                                pathname: '/editevent',
                                state: {
                                  data: data
                                }
                              }}
                            >
                              Edit
                            </Link>
                          </div>
                          <div className="header">{data.entryName}</div>
                          <div className="content">{data.entryDescription}</div>
                          <div className="content">
                            Start Date:{' '}
                            {moment(data.event.eventStartDate).format(
                              'MMMM Do YYYY, h:mm:ss a'
                            )}
                          </div>
                          <div className="content">
                            End{' '}
                            {moment(data.event.eventEndDate).format(
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
                                    Reminder Date:{' '}
                                    {moment(reminder.reminderDate).format(
                                      'MMMM Do YYYY, h:mm:ss a'
                                    )};
                                  </div>
                                  <div className="content">
                                    Reminder Note: {reminder.reminderNote}
                                  </div>
                                  <div
                                    className="ui button"
                                    onClick={() =>
                                      this.deleteReminder(
                                        reminder.id,
                                        data.reminders
                                      )
                                    }
                                  >
                                    Remove Reminder
                                  </div>
                                  <button
                                    className="ui white button"
                                    type="button"
                                    // onClick={() => viewLeaderBoard()}
                                  >
                                    <Link
                                      to={{
                                        pathname: '/editreminder',
                                        state: {
                                          remId: reminder.id
                                        }
                                      }}
                                    >
                                      Edit Reminder
                                    </Link>
                                  </button>
                                </div>
                              )
                            })
                          ) : (
                            <div />
                          )}
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
                                  <Link
                                    to={{
                                      pathname: '/editevent',
                                      state: {
                                        data
                                      }
                                    }}
                                  >
                                    Edit
                                  </Link>
                                </div>
                                <div className="header">{data.entryName}</div>
                                <div className="content">
                                  {data.entryDescription}
                                </div>
                                {data.event ? (
                                  <div>
                                    <div className="content">
                                      Start Date:{' '}
                                      {moment(data.event.eventStartDate).format(
                                        'MMMM Do YYYY, h:mm:ss a'
                                      )}
                                    </div>
                                    <div className="content">
                                      End{' '}
                                      {moment(data.event.eventEndDate).format(
                                        'MMMM Do YYYY, h:mm:ss a'
                                      )}
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
                                          Reminder Date:{' '}
                                          {moment(reminder.reminderDate).format(
                                            'MMMM Do YYYY, h:mm:ss a'
                                          )};
                                        </div>
                                        <div className="content">
                                          Reminder Note: {reminder.reminderNote}
                                        </div>
                                        <div
                                          className="ui button"
                                          onClick={() =>
                                            this.deleteReminder(
                                              reminder.id,
                                              this.state.entries
                                            )
                                          }
                                        >
                                          Remove Reminder
                                        </div>
                                        <button
                                          className="ui white button"
                                          type="button"
                                          // onClick={() => viewLeaderBoard()}
                                        >
                                          <Link
                                            to={{
                                              pathname: '/editreminder',
                                              state: {
                                                remId: reminder.id
                                              }
                                            }}
                                          >
                                            Edit Reminder
                                          </Link>
                                        </button>
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
                                  {data.task.complete === true ? (
                                    <div />
                                  ) : (
                                    <div
                                      className="ui button"
                                      onClick={() =>
                                        this.completeTask(
                                          data.task.id,
                                          data.task
                                        )
                                      }
                                    >
                                      Complete
                                    </div>
                                  )}
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
                                  <Link
                                    to={{
                                      pathname: '/edittask',
                                      state: {
                                        data
                                      }
                                    }}
                                  >
                                    Edit
                                  </Link>
                                </div>
                                <div className="header">{data.entryName}</div>
                                <div className="content">
                                  {data.entryDescription}
                                </div>
                                <div className="content">
                                  Deadline Date:{' '}
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
                                            Reminder Date:{' '}
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
                                            onClick={() =>
                                              this.deleteReminder(
                                                reminder.id,
                                                this.state.entries
                                              )
                                            }
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
                    <center key={user.id}>
                      <h1>
                        #{index + 1} Username: {user.username} - Points:
                        {user.points}
                      </h1>
                    </center>
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

UserHome.propTypes = {
  username: PropTypes.string
}
