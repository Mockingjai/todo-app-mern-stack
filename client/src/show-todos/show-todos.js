import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Todo = ( props ) => {
  return (
      <div>
          <li>
              {props.events.name}
              <Link to={'/edit/' + props.events._id }> Edit</Link>
          </li>
      </div>
  )
};

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: []
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
                })
            })
            .catch(err => console.log(err));
    }
    todoList = (  ) => {
        return this.state.data.map( (event, i) => {
            return <Todo
                events={event}
                key={i}
                onDelete={this.onDelete}
            />;
        })
    };

    render() {
        return (
            <div>
                <ul>
                    {this.todoList()}
                </ul>
            </div>
        )
    }
}
export default TodoList;