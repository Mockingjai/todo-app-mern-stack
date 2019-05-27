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
            passwordError: ''
        }
    }

    onEmailChange = e => this.setState({ email: e.target.value });
    onPasswordChange = e => this.setState({ password: e.target.value });
    validate = () => {
        let emailError = '';
        let passwordError = '';

        if(!this.state.email) {
            emailError = "Email field can't be empty";
        }
        if(!this.state.email.includes("@")) {
            emailError = "Invalid email";
        }
        if(!this.state.password) {
            passwordError = 'Password field can\'t be empty'
        }
        if(this.state.password.length < 6) {
            passwordError = 'Field password require 6 or more characters'
        }
        if(emailError || passwordError) {
            this.setState({emailError, passwordError});
        }
        return true;
    };
    onSubmit = ( e ) => {
        e.preventDefault();
        this.setState({
            emailError: '',
            passwordError: '',
        });
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state);
        } else {
            console.log('Error');
        }
        const checkUser = {
            email: this.state.email,
            password: this.state.password
        };
        console.log(`${this.state.email}, ${this.state.password}`);
        axios.post('http://localhost:3001/users/login', checkUser)
            .then(ress => {
                localStorage.setItem('token', ress.data.token);
                localStorage.setItem('id', ress.data.find);
                const token = localStorage.getItem('token');
                const id = localStorage.getItem('id');
                console.log(`Success --> ${token}, ${id}`);
                history.push('/users/me')
            })
            .catch(err => console.log(`Error --> ${err}`));

        this.setState({
            email: '',
            password: '',
        })
    };
    onRegister = () => history.push('/users/register');

    render() {
        return (
            <div className='login_wrapper'>
                <div className='login'>
                    <div className='user__header_login'>
                        <div className='wrapper_login'>
                            <h2 className='user__title_login'>Login page</h2>
                            <form onSubmit={this.onSubmit} className='form'>
                                <div className='form__group_login'>
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
                                <div className='btn_login_wrapper'>
                                    <button type="submit" className='btn_login_login'>Log in</button>
                                    <button type="submit" className='btn_register_login' onClick={this.onRegister}>To Regitser page</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};