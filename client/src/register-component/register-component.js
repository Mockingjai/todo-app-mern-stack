import React, { Component } from 'react';
import axios from 'axios';
import history from '../history';
import './index.css';

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailError: '',
            passwordError: '',
            submitStatus: true
        }
    }

    validate = () => {
      let emailError = '';
      let passwordError = '';
      let submitStatus = true;

      if(!this.state.email) {
          emailError = "Email field can't be empty";
          submitStatus = false;
      }
      if(!this.state.email.includes("@")) {
          emailError = "Invalid email";
          submitStatus = false;
      }
      if(!this.state.password) {
          passwordError = 'Password field can\'t be empty'
      }
      if(this.state.password.length < 6) {
          passwordError = 'Field password require 6 or more characters'
      }
      if(emailError || passwordError) {
          this.setState({emailError, passwordError, submitStatus});
      }
      return true;
    };

    onEmailChange = e => this.setState({ email: e.target.value });
    onPasswordChange = e => this.setState({ password: e.target.value });
    onLoginPage = (  ) => history.push('/users/login');
    onSubmit = ( e ) => {
        e.preventDefault();
        this.setState({
            emailError: '',
            passwordError: '',
            submitStatus: true
        });
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state);
        } else {
            console.log('Error');
        }
        const newUser = {
            email: this.state.email,
            password: this.state.password
        };
        console.log(`${this.state.email}, ${this.state.password}`);
        axios.post('http://localhost:3001/users/register', newUser)
            .then(ress => {
                console.log(`Success --> ${ress.data}`);
                history.push('/users/login');
            })
            .catch(err => {
                console.log(`Error --> ${err}`);
            });
        this.setState({
            email: '',
            password: ''
        })
    };

    render() {
        return (
            <div className='register_wrapper'>
                <div className='register'>
                    <div className='user__header'>
                        <h2 className='user__title'>Register page</h2>
                        <form onSubmit={this.onSubmit} className='form'>
                            <div className='form__group_inp'>
                                <input
                                    className='form__input'
                                    type="text"
                                    placeholder="Enter email"
                                    defaultValue={this.state.email}
                                    onChange={this.onEmailChange}
                                /><div style={{color: 'red'}}>{this.state.emailError}</div>
                                <input
                                    className='form__input'
                                    type="password"
                                    placeholder="Enter password"
                                    defaultValue={this.state.password}
                                    onChange={this.onPasswordChange}
                                /><div style={{color: 'red'}}>{this.state.passwordError}</div>
                            </div>
                            <div className='form__group_btn'>
                                <button type="submit" className='btn_register'>Register</button>
                                <button onClick={this.onLoginPage} className='btn_login'>Go to Login Page</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}