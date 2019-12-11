import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
// import uuid from 'uuid';
import Axios from 'axios';

export class App extends Component {
  state = {
    todos: []
  }

  //makeing a request to a json placeholder
  componentDidMount() {
    Axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({ todos: res.data }))
  }


  //Toggle todo.completed using this.state now because we are in the highest level
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo;
      })
    })
  }

  //Delete todo
  delTodo = (id) => {
    Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({
        //filter out any ids that were passed from the delTodo click function, return only ids that werent passed via filter
        todos: [...this.state.todos.filter(todo => todo.id !== id)]
      }));
  }

  //Add Todo to the list
  addTodo = (title) => {
    Axios.post('https://jsonplaceholder.typicode.com/todos', {
      title: title,
      completed: false
    })
      .then(res => this.setState({ todos: [...this.state.todos, res.data] }))
    //This is the static setting, we switched to a json post request
    // const newTodo = {
    //   id: uuid.v4(),
    //   title: title,
    //   completed: false
    // }

  }

  render() {

    return (
      <Router>
        <div className="App" >
          <div className='container'>
            <Header />
            <Route exact path='/' render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
              </React.Fragment>
            )} />
            <Route path='/about' component={About} />
          </div>
        </div>
      </Router>
    )

  }
}

export default App

