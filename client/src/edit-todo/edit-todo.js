import React, { Component } from 'react';
import axios from 'axios';

export default class EditTodo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            date: '',
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
                .catch(err => console.log(err))
        });
        console.log(url);
        this.onDelete = () => {
            const url = window.location.href.split('/');
            this.setState({itemId: url[url.length - 1]}, () => {
                axios.delete(`http://localhost:3001/delete/${this.state.itemId}`, {headers: {'x-auth-token': localStorage.getItem('token')}})
                    .then(ress => {
                        this.setState({
                            data: ress.data
                        });
                        console.log(ress);
                    })
                    .catch(err => console.log(err))
            });

        };
    }

    onChangeName = (e) => this.setState({name: e.target.value});
    onChangeDate = (e) => this.setState({date: e.target.value});
    onSubmit = (e) => {
        e.preventDefault();
        const event = {
            name: this.state.name,
            date: this.state.date
        };
      axios.post(`http://localhost:3001/edit/${this.state.itemId}`, event, {headers: {'x-auth-token': localStorage.getItem('token')}})
          .then(ress => {
              console.log(ress.data);
          })
          .catch(err => console.log(err))
    };

    render() {
        return (
            <div>
                <h3 align="center">Update Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                defaultValue={this.state.name}
                                onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeDate}
                        />
                    </div>
                    <br />
                    <button onClick={this.onDelete}>Delete</button>
                    <br />
                    <div className="form-group">
                        <input type="submit" value="Update Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}