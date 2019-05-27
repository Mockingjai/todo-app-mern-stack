import React, { Component } from 'react';
import axios from 'axios';
import history from '../history';
import './index.css';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: '',
            amount: [],
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3001/users/me', {headers: {'x-auth-token': localStorage.getItem('token')}})
            .then(ress => {
                this.setState({
                    data: ress.data.user.email,
                });
                console.log(this.state.data);
            })
            .catch(err => {
                // history.push('/users/login');
                console.log(err)
            });
        //
        axios.get('http://localhost:3001/events/show', {headers:
            {'x-auth-token': localStorage.getItem('token'),
             'owner': localStorage.getItem('id')}
        })
            .then(ress => {
                this.setState({
                    amount: ress.data.length,
                });
                console.log(ress.data.length);
            })
            .catch(err => console.log(err));
    }
    onLogout = (  ) => {
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      history.push('/');
    };
    onShow = (  ) => {
      history.push('/events/show');
    };
    onCreate = (  ) => {
      history.push('/events/create');
    };
    render() {
        const checkAmount = () => {
            let call = '';
            if(this.state.amount <= 1) {
                call = "event";
            } else {
                call = "events";
            }
            return call;
        };
        return (
            <div className='user_wrapper'>
                <div className='user_info_container'>
                    <div>
                        User Profile
                        <p>Email: {this.state.data}</p>
                        <p className='event_count'>You have: {this.state.amount} {checkAmount()}</p>
                    </div>
                </div>
                <div className='btn_wrapper'>
                    <button onClick={this.onLogout} className='btn_out' style={{margin: '0 0 0 45px'}}>Log out</button>
                    <button onClick={this.onShow} className='btn_show' style={{margin: '0 0 0 45px'}}>Show my events</button>
                    <button onClick={this.onCreate} className='btn_create' style={{margin: '0 0 0 45px'}}>Create event</button>
                </div>
            </div>
        )
    }
}
export default Profile;