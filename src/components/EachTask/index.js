import {Component} from 'react'

import {BiEdit} from 'react-icons/bi'

import {AiFillDelete} from 'react-icons/ai'

import './index.css'

class EachTask extends Component {
  state = {taskMsg: '', date: '', time: ''}

  updateTask = () => {
    const {eachItem, updateTask} = this.props
    const {taskMsg, date, time} = this.state
    const updatedObj = {
      id: eachItem.id,
      task_msg: `${taskMsg !== '' ? taskMsg : eachItem.task_msg}`,
      task_date: `${date !== '' ? date : eachItem.task_date}`,
      time: `${time !== '' ? time : eachItem.time}`,
    }
    updateTask(updatedObj)
  }

  editTask = () => {
    const {editStatus, eachItem} = this.props
    editStatus(eachItem.id)
  }

  deleteTask = () => {
    const {deleteMyTask, eachItem} = this.props
    deleteMyTask(eachItem.id)
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

  render() {
    const {eachItem, showEdit} = this.props
    const {taskMsg, date, time} = this.state
    return (
      <>
        <li className="task">
          <div className="task-avatar-details-container">
            <img
              src="http://www.gravatar.com/avatar/cf94b74bd41b466bb185bd4d674f032b?default=https%3A%2F%2Fs3.sloovi.com%2Favatar-default-icon.png"
              alt="avatar"
              className="avatar"
            />
            <div className="task-mess-date">
              <h1 className="task-description">{eachItem.task_msg}</h1>
              <p className="task-time">{eachItem.task_date}</p>
            </div>
          </div>
          <div>
            <button type="button">
              <BiEdit className="icon" onClick={this.editTask} />
            </button>
            <button type="button" onClick={this.deleteTask}>
              <AiFillDelete className="icon" />
            </button>
          </div>
        </li>
        {showEdit && (
          <div
            className="form-main-container"
            style={{
              width: '100%',
              marginLeft: '0px',
              border: '0px',
              boxShadow: '2px 2px 2px 0px #bfbfbf',
            }}
          >
            <div className="input-container">
              <label htmlFor="description">Task Description</label>
              <input
                type="text"
                id="description"
                value={taskMsg}
                onChange={this.onChangeDescription}
              />
            </div>
            <div className="date-time-container">
              <div className="input-container">
                <label htmlFor="date">Date</label>
                <input
                  type="text"
                  className="input-date"
                  onChange={this.onChangeDate}
                  value={date}
                />
              </div>
              <div className="input-container">
                <label htmlFor="Time">Time</label>
                <input type="text" onChange={this.onChangeTime} value={time} />
              </div>
            </div>
            <div className="button-container">
              <button type="button" className="cancel-but">
                Cancel
              </button>
              <button
                type="button"
                className="save-but"
                onClick={this.updateTask}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </>
    )
  }
}

export default EachTask
