import React, { Component } from 'react';
import axios from 'axios';

class AddTodo extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            date: '',
            owner: ''
        }
    }

    onNameChange = e => this.setState({ name: e.target.value });
    onDateChange = e => this.setState({ date: e.target.value });

    onSubmit = ( e ) => {
        e.preventDefault();
        const newEvent = {
            name: this.state.name,
            date:this.state.date,
            owner: localStorage.getItem('id')
        };
        console.log(`${this.state.name}--${this.state.date}--${this.state.owner}`);

        axios.post('http://localhost:3001/create', newEvent,{
            headers: {'x-auth-token': localStorage.getItem('token')}
        }).then(ress => console.log(ress.data))
            .catch(err => console.log(err));

        this.setState({
            name: '',
            date: '',
        })
    };

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input
                        type='text'
                        placeholder='Enter name of the event'
                        defaultValue={this.state.name}
                        onChange={this.onNameChange}
                    />
                    <input
                        type='text'
                        placeholder='Enter date for the event'
                        defaultValue={this.state.date}
                        onChange={this.onDateChange}
                    />
                    <button type='submit'>
                        Add todo
                    </button>
                </form>
            </div>
        )
    }

}
export default AddTodo;