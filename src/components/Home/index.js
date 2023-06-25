import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiOutlinePlus} from 'react-icons/ai'
import Header from '../Header'
import Form from '../Form'
import EachTask from '../EachTask'

import './index.css'

class Home extends Component {
  state = {
    teamDetails: [],
    myTasks: [],
    showForm: false,
    showEdit: null,
  }

  componentDidMount() {
    this.getTeamDetails()
    this.getAllTasks()
  }

  getAllTasks = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    const response = await fetch(
      'https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2?company_id=company_0f8d040401d14916bc2430480d7aa0f8',
      option,
    )
    const data = await response.json()
    const tasks = data.results
    this.setState(preState => ({myTasks: [...preState.myTasks, ...tasks]}))
  }

  getTeamDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    const response = await fetch(
      'https://stage.api.sloovi.com/team?product=outreach&company_id=company_0f8d040401d14916bc2430480d7aa0f8',
      option,
    )
    const data = await response.json()
    const team = data.results.data
    this.setState({teamDetails: [...team]})
  }

  deleteMyTask = id => {
    const {myTasks} = this.state
    const filteredTasks = myTasks.filter(each => each.id !== id)
    this.setState({myTasks: filteredTasks})
  }

  addButton = () => {
    const {showForm} = this.state
    this.setState({showForm: !showForm})
  }

  getNewObj = task => {
    const {myTasks} = this.state
    this.setState({myTasks: [...myTasks, task]})
  }

  editStatus = id => {
    this.setState(preState => {
      if (preState.showEdit !== id) {
        return {showEdit: id}
      }
      return {showEdit: null}
    })
  }

  updateTask = obj => {
    const {myTasks} = this.state
    const newTasks = myTasks.map(each => {
      if (each.id === obj.id) {
        return {...each, ...obj}
      }
      return each
    })
    this.setState({myTasks: newTasks})
  }

  render() {
    const {teamDetails, showForm, showEdit, myTasks} = this.state
    console.log(showEdit)
    return (
      <>
        <Header />
        <div className="home-container">
          <div className="left-container">
            <div className="container-1">
              <p className>Tasks</p>
              <button
                type="button"
                className="add-button"
                onClick={this.addButton}
              >
                <AiOutlinePlus />
              </button>
            </div>
            {showForm && (
              <Form teamDetails={teamDetails} getNewObj={this.getNewObj} />
            )}
          </div>
          <div className="right-container">
            <ul className="tasks-list">
              {myTasks.map(eachItem => (
                <EachTask
                  eachItem={eachItem}
                  key={eachItem.id}
                  deleteMyTask={this.deleteMyTask}
                  showEdit={showEdit === eachItem.id}
                  editStatus={this.editStatus}
                  updateTask={this.updateTask}
                />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default Home
