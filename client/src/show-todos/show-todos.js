import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import history from '../history';
import './index.css';

const Todo = ( props ) => {
   const  onCreateToggle = (  ) => {
        history.push('/events/create');
    };
   const onBackToProfile = (  ) => {
        history.push('/users/me');
    };

   return (
      <div className='show_wrapper'>
          <li className='list_element'>
                  {props.events.name}
                  <br />
                <Link to={'/events/edit/' + props.events._id } className='link_to'>Edit</Link>
              <div className='btn_show_holder'>
                  <button onClick={onCreateToggle} className='on_create'>Create event</button>
                  <br />
                  <button onClick={onBackToProfile} className='on_profile'>Back to my profile</button>
              </div>
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
        axios.get('http://localhost:3001/events/show',
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
                // history.push('/users/login');
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
    render() {
        return (
            <div className='list_wrapper'>
                <div>
                    <ul className='evens_list'>
                        {this.todoList()}
                    </ul>
                </div>
                <br />
            </div>
        )
    }
}
export default TodoList;