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
        }
    }

    onEmailChange = e => this.setState({ email: e.target.value });
    onPasswordChange = e => this.setState({ password: e.target.value });
    onLoginPage = e => history.push('/users/login');
    onSubmit = ( e ) => {
        e.preventDefault();
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
                history.push('/users/login');
            });

        this.setState({
            email: '',
            password: ''
        })
    };


    render() {
        return (
            <div>
                <div className='wrapper_registr'>
                    <h2>Register page</h2>
                    <form onSubmit={this.onSubmit} className='form_wrapper'>
                        <input
                            className='inp_email'
                            type="text"
                            placeholder="Enter email"
                            defaultValue={this.state.email}
                            onChange={this.onEmailChange}
                        />
                        <input
                            className='inp_pass'
                            type="password"
                            placeholder="Enter password"
                            defaultValue={this.state.password}
                            onChange={this.onPasswordChange}
                        />
                        <button type="submit" className='btn_sb'>Submit</button>
                        <br />
                        <button onClick={this.onLoginPage} className=''>Go to Login Page</button>
                    </form>
                </div>
            </div>
        )
    }
}