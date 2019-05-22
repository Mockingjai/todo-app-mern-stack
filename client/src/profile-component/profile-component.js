import React, { Component } from 'react';
import axios from 'axios';
import history from '../history';
import './index.css';

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
            .catch(err => {
                history.push('/users/login');
                console.log(err)
            });
    }
    onLogout = (  ) => {
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      history.push('/');
    };
    onShow = (  ) => {
      history.push('/show');
    };
    onCreate = (  ) => {
      history.push('/create');
    };
    render() {
        return (
            <div className='user_wrapper'>
                <div className='user_info'>
                    User Profile
                    <p>Email: {this.state.data}</p>
                </div>
                <div className='btn_wrapper'>
                    <button onClick={this.onLogout} className='bnt_out'>Log out</button>
                    <button onClick={this.onShow} className='bnt_show'>Show my events</button>
                    <button onClick={this.onCreate} className='bnt_create'>Create event</button>
                </div>
            </div>
        )
    }
}
export default Profile;