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

    onSubmit = ( e ) => {
        e.preventDefault();
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
            password: ''
        })
    };

    render() {
        return (
            <div>
                <div>
                    <div className='wrapper_login'>
                        <h2>Login page</h2>
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
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}