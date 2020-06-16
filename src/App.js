import React, { Component } from 'react';

import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing: null,
      filter :{
        name : '',
        status: -1
      },
      keyword : '',
      by :"name",
      value : 1
    }
  }
  componentWillMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      var tasks = JSON.parse(localStorage.getItem('tasks'))
      this.setState({
        tasks: tasks
      });
    }
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x1000).toString(16).substring(1);
  }

  generateID() {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4();
  }

  OnToggleForm = () => {
    if (this.state.isDisplayForm && this.state.taskEditing !== null) {
      this.setState({
        isDisplayForm: true,
        taskEditing: null
      });
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditing: null
      });
    }
  }

  onCLose = () => {
    this.setState({
      isDisplayForm: false
    });
  }
  onSubmit = (data) => {
    const { tasks } = this.state;
    const newTasks = tasks;
    if (data.id === '') {
      data.id = this.generateID();
      newTasks.push(data);
    } else {
      let index = this.findIndex(data.id);
      tasks[index] = data;
    }


    this.setState = ({
      tasks: newTasks,
      taskEditing: null
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  onUpdateStatus = (id) => {
    const { tasks } = this.state;
    let index = this.findIndex(id);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  }
  findIndex = (id) => {
    const { tasks } = this.state;
    let result = -1;
    tasks.forEach((tasks, index) => {
      if (tasks.id === id) {
        result = index;
      }
    }
    );
    return result;
  }
  onDelete = (id) => {
    const { tasks } = this.state;
    let index = this.findIndex(id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    this.onCloseForm();
  }
  onCloseForm = () => {
    this.setState({
      isDisplayForm: false
    });
  }
  onShowFrom = () => {
    this.setState({
      isDisplayForm: true
    });
  }

  onUpdate = (id) => {
    const { tasks } = this.state;
    let index = this.findIndex(id);
    let taskEd = tasks[index];
    this.setState({
      taskEditing: taskEd
    });
    this.onShowFrom();
  }
  onFilter =(filterName,filterStatus) => {
   
    filterStatus= parseInt(filterStatus, 10);
    this.setState({
      filter:{
        name: filterName.toLowerCase(),
        status: filterStatus
      }
    })
  }

  onSearch =(keyword) =>{
    this.setState({
      keyword:keyword.toLowerCase()
    });
  }

  onSort = (sortBy, sortValue) =>{
    this.setState({
        by: sortBy,
        value : sortValue
    })
  }
  render() {
    //Hien thi du lieu ra table
    var { tasks, isDisplayForm, taskEditing, filter,keyword , by, value} = this.state;
    //An/Hien form 
    var elemTaskForm = isDisplayForm ? <TaskForm onCloseForm={this.onCLose} onSubmit={this.onSubmit} task={taskEditing} /> : '';
    //Filter
    if(filter){
      if(filter.name){
        tasks = tasks.filter((task) =>{
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      tasks= tasks.filter((task) => {
        if (filter.status === -1){
          return task;
        }
        else{
          return task.status === (filter.status === 1 ? true : false);
        }
      });
    }
    if(keyword){
      tasks = tasks.filter((task) =>{
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }

    // if(by === 'name'){
    //   tasks.sort((a,b) =>{
    //     if(a.name >b.name) return value;
    //     else if(a.name<b.name) return -value
    //   });
    // }
    console.log(by,'-',value);
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
        </div>
        <hr />
        <div className="row">
          <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
            {elemTaskForm}
          </div>

          <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>

            <button type="button" className="btn btn-primary" onClick={this.OnToggleForm}>
              <i className="fas fa-plus"></i>Thêm Công Việc
            </button>
            
            <Control onSearch={this.onSearch}  onSort={this.onSort}/>

            <div className="row mt-15">

              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">

                <TaskList tasks={tasks} onUpdateStatus={this.onUpdateStatus} onDelete={this.onDelete} onUpdate={this.onUpdate} onFilter={this.onFilter}/>
              </div>

            </div>


          </div>

        </div>

      </div>

    );
  }
}

export default App;
