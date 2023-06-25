import {v4} from 'uuid'

import {Component} from 'react'

import './index.css'

class Form extends Component {
  state = {taskMsg: '', date: '', time: '', teamMember: {}}

  addNewTask = () => {
    const {getNewObj} = this.props
    const {taskMsg, date, time, teamMember} = this.state
    const obj = {
      id: v4(),
      task_msg: taskMsg,
      task_date: date,
      time,
      teamMember: teamMember.name,
    }
    console.log(obj)
    getNewObj(obj)
  }

  onChangeDescription = event => {
    this.setState({taskMsg: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onChangeTime = event => {
    this.setState({time: event.target.value})
  }

  onChangeTeamMember = event => {
    const {teamDetails} = this.props
    const person = teamDetails.filter(each => each.name === event.target.value)
    this.setState({teamMember: {...person}})
  }

  render() {
    const {teamDetails} = this.props
    const {description, date, time, teamMember} = this.state
    return (
      <div className="form-main-container">
        <div className="input-container">
          <label htmlFor="description">Task Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={this.onChangeDescription}
          />
        </div>
        <div className="date-time-container">
          <div className="input-container">
            <label htmlFor="date">Date</label>
            <input
              type="text"
              className="input-date"
              value={date}
              onChange={this.onChangeDate}
            />
          </div>
          <div className="input-container">
            <label htmlFor="Time">Time</label>
            <input type="text" onChange={this.onChangeTime} value={time} />
          </div>
        </div>
        <div className="input-container">
          <label htmlFor="description">Assigned User</label>
          <select onChange={this.onChangeTeamMember} value={teamMember}>
            {teamDetails.map(each => (
              <option key={each.user_id}>{each.name}</option>
            ))}
          </select>
        </div>
        <div className="button-container">
          <button type="button" className="cancel-but">
            Cancel
          </button>
          <button type="button" className="save-but" onClick={this.addNewTask}>
            Save
          </button>
        </div>
      </div>
    )
  }
}

export default Form
