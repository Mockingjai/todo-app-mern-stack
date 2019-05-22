import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect } from "react-router-dom";
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
        }
    }

    componentDidMount() {
        const url = window.location.href.split('/');
        this.setState({itemId: url[url.length - 1]}, () => {
            axios.get(`http://localhost:3001/show/${this.state.itemId}`, {headers: {'x-auth-token': localStorage.getItem('token')}})
                .then(ress => {
                    this.setState({
                        name: ress.data.event.name,
                        date: ress.data.event.date,
                    });
                    console.log(ress);
                })
                .catch(err => {
                    history.push('/users/login');
                    console.log(err)
                })
        });
        console.log(url);
    }

    onChangeName = (e) => this.setState({name: e.target.value});
    onChangeDate = (e) => this.setState({date: e.target.value});
    onSubmit = (e) => {
        e.preventDefault();
        const event = {
            name: this.state.name,
            date: this.state.date
        };
      axios.put(`http://localhost:3001/edit/${this.state.itemId}`, event, {headers: {'x-auth-token': localStorage.getItem('token')}})
          .then(ress => {
              console.log(ress.data);
              history.push('/show');
          })
          .catch(err => {
              console.log(err);
              history.push('/show');
          })
    };

    onDelete = () => {
        const url = window.location.href.split('/');
        this.setState({itemId: url[url.length - 1]}, () => {
            axios.delete(`http://localhost:3001/delete/${this.state.itemId}`, {headers: {'x-auth-token': localStorage.getItem('token')}})
                .then(ress => {
                    this.setState({
                        data: ress.data
                    });
                    console.log(ress);
                    history.push("/show");
                })
                .catch(err => {
                    console.log(err);
                    history.push("/show");
                })
        });

    };
    onCancelToggle = (  ) => {
        history.push('/show');
    };
    render() {
        return (
            <Router>
            <div className='edit_wrapper'>
                <form onSubmit={this.onSubmit} className='form_edit'>
                    <h3 align="center">Update Todo</h3>
                    <div className="form-group">
                        <label>Name: </label>
                        <input  type="text"
                                className='inp_name_ed'
                                defaultValue={this.state.name}
                                onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <input
                            className='inp_date_ed'
                            type="text"
                            value={this.state.date}
                            onChange={this.onChangeDate}
                        />
                    </div>
                    <br />
                    <button onClick={this.onDelete}
                            className='on_delete_btn'>
                        Delete
                    </button>
                    <br />
                        <input type="submit" value="Update Todo"
                               className='on_update_btn'
                        />
                    <button onClick={this.onCancelToggle} className='on_cancle_btn'>Cancel edit</button>
                </form>
            </div>
            </Router>
        )
    }
}