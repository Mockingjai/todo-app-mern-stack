import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Register from '../register-component/register-component';
import Login from '../login-component/login-component';
import Profile from '../profile-component/profile-component';
import TodoList from '../show-todos/show-todos';
import AddTodo from '../add-todo/add-todo';
import EditTodo from '../edit-todo/edit-todo';
import './App.css';

class  App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            </div>
            <Route path='/users/register' exact component={Register}/>
            <Route path='/users/login' component={Login} />
            <Route path='/users/me' component={Profile} />
            <Route path='/show' component={TodoList} />
            <Route path='/create' component={AddTodo} />
            <Route path='/edit/' component={EditTodo} />
        </Router>
    );
  }
}

export default App;
