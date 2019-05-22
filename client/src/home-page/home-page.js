import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Login from "../login-component/login-component";
import Register from "../register-component/register-component";
import history from '../history';
import './index.css';

const toLoginPage = (  ) => {
  history.push('/users/login');
};
const toRegPage = (  ) => {
    history.push('/users/register')
};

const HomePage = (  ) => {
  return (
      <div className='home_component'>
          <h1>Welcome on our website - EventsReminder</h1>
          <h3>If you are a new on this website use Register link</h3>
          <h3>If you are already have account, please use Login link</h3>
          <div className='home_page_wrapper'>
              <Router>
                  <div className='loginBtn'>
                    <button onClick={toLoginPage}>To Login Page</button>
                  </div>
                  <div className='registBtn'>
                    <button onClick={toRegPage}>To Register Page</button>
                  </div>
              </Router>
          </div>
      </div>
  )
};
export default HomePage;