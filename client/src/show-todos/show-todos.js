import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import history from '../history';
import './index.css';

const Todo = ( props ) => {
  return (
      <div>
          <li className='list_element'>
              <span>
                  {props.events.name}
              </span>
              <br />
              <Link to={'/edit/' + props.events._id }>Edit</Link>
          </li>
      </div>
  )
};

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3001/show',
            {headers: {
                'x-auth-token': localStorage.getItem('token'),
                'owner': localStorage.getItem('id')
                }
            })
            .then(ress => {
                this.setState({
                    data: ress.data
                });
            })
            .catch(err => {
                history.push('/users/login');
                console.log(err);
            });
    }
    todoList = (  ) => {
        return this.state.data.map( (event, i) => {
            return <Todo
                events={event}
                key={i}
            />;
        })
    };
    onCreateToggle = (  ) => {
        history.push('/create');
    };
    onBackToProfile = (  ) => {
      history.push('/users/me');
    };
    render() {
        return (
            <div className='list_wrapper'>
                <div>
                    <ul className='evens_list'>
                        {this.todoList()}
                    </ul>
                </div>
                <br />
                <button onClick={this.onCreateToggle} className='on_create'>Create event</button>
                <br />
                <button onClick={this.onBackToProfile} className='on_profile'>Back to my profile</button>
            </div>
        )
    }
}
export default TodoList;