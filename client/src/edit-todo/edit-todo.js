import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';
import history from '../history'
import './index.css';

export default class EditTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            date: '',
            completed: '',
            nameError: '',
            dateError: ''
        }
    }

    componentDidMount() {
        const url = window.location.href.split('/');
        this.setState({itemId: url[url.length - 1]}, () => {
            axios.get(`http://localhost:3001/events/show/${this.state.itemId}`, {headers: {'x-auth-token': localStorage.getItem('token')}})
                .then(ress => {
                    console.log(ress);
                    this.setState({
                        name: ress.data.events.name,
                        date: ress.data.events.date.slice(0,10),
                    });
                })
                .catch(err => {
                    console.log(err)
                })
        });
        // console.log(url);
    }
    onChangeName = (e) => this.setState({name: e.target.value});
    onChangeDate = (e) => this.setState({date: e.target.value});
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
    onSubmit = (e) => {
        e.preventDefault();
        this.setState({
            nameError: '',
            dateError: '',
        });
        let isValid = this.validate();
        if(isValid) {
            console.log(this.state);
        }
        const event = {
            name: this.state.name,
            date: this.state.date
        };
        axios.put(`http://localhost:3001/events/edit/${this.state.itemId}`, event, {headers: {'x-auth-token': localStorage.getItem('token')}})
          .then(ress => {
              console.log(ress.data);
              history.push('/events/show/');
          })
          .catch(err => {
              console.log(err);
              history.push('/events/show');
          })
    };

    onDelete = () => {
        const url = window.location.href.split('/');
        this.setState({itemId: url[url.length - 1]}, () => {
            axios.delete(`http://localhost:3001/events/delete/${this.state.itemId}`, {headers: {'x-auth-token': localStorage.getItem('token')}})
                .then(ress => {
                    this.setState({
                        data: ress.data
                    });
                    console.log(ress);
                    history.push("/events/show");
                })
                .catch(err => {
                    console.log(err);
                    history.push("/events/show");
                })
        });

    };
    onCancelToggle = (  ) => {
        history.push('/events/show');
    };
    render() {
        return (
            <Router>
            <div>
                <div className='edit_wrapper'>
                    <form onSubmit={this.onSubmit} className='form_edit'>
                        <h3 align="center">Update Todo</h3>
                        <div className="form-group">
                            <label>Name: </label>
                            <input  type="text"
                                    className='form__input'
                                    defaultValue={this.state.name}
                                    onChange={this.onChangeName}
                            />
                        </div><div style={{color: 'red'}}>{this.state.nameError}</div>
                        <div className="form__group">
                            <label>Date: </label>
                            <input
                                className='form__input'
                                type="text"
                                value={this.state.date}
                                onChange={this.onChangeDate}
                            /><div style={{color: 'red'}}>{this.state.dateError}</div>
                        </div>
                        <br />
                        <button onClick={this.onDelete}
                                className='btn'>
                            Delete
                        </button>
                        <br />
                            <input type="submit" value="Update Todo"
                                   className='btn'
                            />
                        <button onClick={this.onCancelToggle} className='btn'>Cancel edit</button>
                    </form>
                </div>
            </div>
            </Router>
        )
    }
}