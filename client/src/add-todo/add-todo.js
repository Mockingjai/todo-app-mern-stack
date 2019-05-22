import React, { Component } from 'react';
import axios from 'axios';
import history from '../history';
import './index.css';
class AddTodo extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            date: '',
            owner: '',
        }
    }

    onNameChange = e => this.setState({ name: e.target.value });
    onDateChange = e => this.setState({ date: e.target.value });

    onSubmit = ( e ) => {
        e.preventDefault();
        const newEvent = {
            name: this.state.name,
            date:this.state.date,
            owner: localStorage.getItem('id'),
        };
        console.log(`${this.state.name}--${this.state.date}--${this.state.owner}--${this.state.completed}`);

        axios.post('http://localhost:3001/create', newEvent,{
            headers: {'x-auth-token': localStorage.getItem('token')}
        }).then(ress => {
            console.log(ress.data);
        })
            .catch(err => console.log(err));

        this.setState({
            name: '',
            date: '',
            completed: false
        })
    };
    onBackToProfile = (  ) => {
      history.push('/users/me');
    };
    onShowEvent = (  ) => {
      history.push('/show');
    };
    render() {
        return (
            <div className='create_wrapper'>
                <form onSubmit={this.onSubmit} className='create_form'>
                    <input
                        className='inp_name'
                        type='text'
                        placeholder='Enter name of the event'
                        defaultValue={this.state.name}
                        onChange={this.onNameChange}
                    />
                    <input
                        className='inp_date'
                        type='text'
                        placeholder='Enter date for the event'
                        defaultValue={this.state.date}
                        onChange={this.onDateChange}
                    />
                    <button type='submit' className='btn_smb'>
                        Add todo
                    </button>
                    <button onClick={this.onBackToProfile} className='btn_profile'>
                        Back to my profile
                    </button>
                    <button onClick={this.onShowEvent} className='btn_ev'>
                        Show events
                    </button>
                </form>
            </div>
        )
    }

}
export default AddTodo;