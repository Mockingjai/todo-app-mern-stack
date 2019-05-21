import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: ''
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3001/users/me', {headers: {'x-auth-token': localStorage.getItem('token')}})
            .then(ress => {
                this.setState({
                    data: ress.data.email
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <p>Email: {this.state.data}</p>
            </div>
        )
    }
}
export default Profile;