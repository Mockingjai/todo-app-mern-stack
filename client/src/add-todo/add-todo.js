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
            nameError: '',
            dateError: ''
        }
    }

    onNameChange = e => this.setState({ name: e.target.value });
    onDateChange = e => this.setState({ date: e.target.value });
    validate = () => {
      let nameError = '';
      let dateError = '';

      if(!this.state.name) {
          nameError = 'Field name is required';
      }
      if(!this.state.date) {
          dateError = 'Field date is required';
      }
      if(!this.state.date.match(/^\d{4}-\d{2}-\d{2}$/)) {
          dateError = 'Please enter correct date. Example: 2019-05-21';
      }
      if(nameError || dateError) {
          this.setState({nameError, dateError});
      }
      return true;
    };
    onSubmit = ( e ) => {
        e.preventDefault();
        this.setState({
            nameError: '',
            dateError: '',
        });
        let isValid = this.validate();
        if(isValid) {
            console.log(this.state);
        } else {
            console.log('Error');
        }
        const newEvent = {
            name: this.state.name,
            date:this.state.date,
            owner: localStorage.getItem('id'),
        };
        console.log(`${this.state.name}--${this.state.date}--${this.state.owner}--${this.state.completed}`);

        axios.post('http://localhost:3001/events/create', newEvent,{
            headers: {'x-auth-token': localStorage.getItem('token')}
        }).then(ress => {
            console.log(ress.data);
        }).catch(err => console.log(err));
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
      history.push('/events/show');
    };

    render() {
        return (
            <div className='create_holder'>
                <div className='create_wrapper'>
                    <form onSubmit={this.onSubmit} className='form'>
                        <div className='form__group_create'>
                            <input
                                className='form__input'
                                type='text'
                                placeholder='Enter name of the event'
                                defaultValue={this.state.name}
                                onChange={this.onNameChange}
                            /><div style={{color: 'red'}}>{this.state.nameError}</div>
                        </div>
                            <div className='form__group'>
                                <input
                                    className='form__input'
                                    type='text'
                                    placeholder='Enter date for the event'
                                    defaultValue={this.state.date}
                                    onChange={this.onDateChange}
                                /><div style={{color: 'red'}}>{this.state.dateError}</div>
                            </div>
                        <div className='action_wrapper'>
                            <div className='form__group'>
                                <button type='submit' className='btn'>
                                    Add todo
                                </button>
                            </div>
                            <div className='form__group'>
                                <button onClick={this.onBackToProfile} className='btn'>
                                    Back to my profile
                                </button>
                            </div>
                            <div className='form__group'>
                                <button onClick={this.onShowEvent} className='btn'>
                                    Show events
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}
export default AddTodo;