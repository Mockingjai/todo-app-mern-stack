import React, { Component } from 'react';
import axios from 'axios';

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
        const newUser = {
            email: this.state.email,
            password: this.state.password
        };
        console.log(`${this.state.email}, ${this.state.password}`);
        axios.post('http://localhost:3001/users/register', newUser)
            .then(ress => console.log(`Success --> ${ress.data}`))
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
                    <form onSubmit={this.onSubmit}>
                        <input
                            type="text"
                            placeholder="Enter email"
                            defaultValue={this.state.email}
                            onChange={this.onEmailChange}
                        />
                        <input
                            type="password"
                            placeholder="Enter password"
                            defaultValue={this.state.password}
                            onChange={this.onPasswordChange}
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}