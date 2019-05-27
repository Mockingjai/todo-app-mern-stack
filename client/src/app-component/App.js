import React, {Component, Fragment} from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import HomePage from '../home-page/home-page';
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
        <Fragment>
          <div className='main_page'></div>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route  path='/users/login' component={Login} />
            <Route path='/users/register' component={Register}/>
            <Route path='/users/me' component={Profile} />
            <Route path='/events/show/' component={TodoList} />
            <Route path='/events/create' component={AddTodo} />
            <Route path='/events/edit' component={EditTodo} />
          </Switch>
        </Fragment>
    );
  }
}

export default App;
