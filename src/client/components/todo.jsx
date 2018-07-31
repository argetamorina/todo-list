import React, { Component } from 'react';
import axios from 'axios';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: props.location.state && props.location.state.authUser ? props.location.state.authUser : props.authUser,
      todo: '',
      todos: []
    };

    this.onListChange = this.onListChange.bind(this);
    this.onListCreate = this.onListCreate.bind(this);

    this.logOut = this.logOut.bind(this);
  }

  componentWillMount() {
    // before loading todo, redirect to login if user is not authenticated
    if (!this.state.authUser) {
      this.props.history.push('/login');
    }

    const { authUser } = this.state;

    axios.get('/api/todo', {
      token: authUser.token
    })
      .then(response => {
        const todos = response.data;
        this.setState({ todos });
      })
      .catch(err => console.log(err.response));
  }

  onListChange(e) {
    this.setState({
      todo: e.target.value
    });
  }

  onListCreate(e) {
    e.preventDefault();

    const { authUser } = this.state;

    axios.post('/api/todo', {
        user: this.props.authUser._id,
        name: this.state.todo,
        token: authUser.token
    })
      .then(response => {
        const todo = response.data;

        let state = this.state;
        state.todos.unshift(todo);
        state.todo = '';
        this.setState(state);
      })
      .catch(err => {
        console.error(err);
        alert('Todo create failed');
      });
  }

  onListDelete(id) {
    // let authUser

    request(`/todo/${id}`, {
      method: 'delete',
      token: authUser.token
    })
      .then(() => {
        let state = this.state;

        console.log(state.todos);
        state.todos = state.todos.filter(todo => todo._id != id);
        console.log(state.todos);

        this.setState(state);
      })
      .catch(err => {
        console.error(err);
        alert('Todo delete failed');
      });
  }
  

  logOut() {
    localStorage.removeItem('user');
    location.reload();
  }

  render () {
    const { authUser } = this.state;

    if (!authUser) {
      return null;  
    }

    return (
      <div className="lists">
        <div className="lists__header">
          <h2 className="lists__header__title">To-do List</h2>
          <h2 className="lists__header__subtitle">Hello, {authUser.name}</h2>
          <a className="lists__header__logout" href="#" onClick={this.logOut}>Log Out</a>
        </div>
        
        <form className="lists__form" onSubmit={this.onListCreate}>
          <input className="lists__input" value={this.state.todo} onChange={this.onListChange} type="text" placeholder="Write To-do list" />
          <button className="lists__btn">
            <svg className="lists__btn__plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 357 357">
              <path d="M357 204H204v153h-51V204H0v-51h153V0h51v153h153v51z" />
            </svg> 
            Add List 
          </button>
        </form>

        {this.state.todos && this.state.todos.length ?
          <table className="table">
            <caption>List of users</caption>
            <thead>
              <tr>
                <th className="table__title" scope="col">#</th>
                <th className="table__title" scope="col">To-Do</th>
                <th className="table__title" scope="col">Name</th>
                <th className="table__title" scope="col">Time</th>
                <th className="table__title" scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              {this.state.todos.map((todo) => (
                <tr className="table__row" >
                  <td className="table__row__item">
                    <input type="checkbox" name="" id="" onClick={() => alert('hello')}/>
                  </td>
                  <td className="table__row__item">{todo.name}</td>
                  <td className="table__row__item">{todo.user.name}</td>
                  <td className="table__row__item">
                    <svg className="lists__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612 612"><path d="M587.572 186.881c-32.266-75.225-87.096-129.934-162.949-162.285C386.711 8.427 346.992.168 305.497.168c-41.488 0-80.914 8.181-118.784 24.428-75.225 32.265-130.298 86.939-162.621 162.285C7.895 224.629 0 264.176 0 305.664c0 41.496 7.895 81.371 24.092 119.127 32.323 75.346 87.403 130.348 162.621 162.621 37.877 16.247 77.295 24.42 118.784 24.42 41.489 0 81.214-8.259 119.12-24.42C500.47 555.06 555.3 500.009 587.573 424.791 603.819 386.914 612 347.16 612 305.664c0-41.488-8.174-80.907-24.428-118.783zm-48.848 253.972c-24.021 41.195-56.929 73.876-98.375 98.039-41.195 24.021-86.332 36.135-134.845 36.135-36.47 0-71.27-7.024-104.4-21.415-33.129-14.384-61.733-33.294-85.661-57.215-23.928-23.928-42.973-52.811-57.214-85.997-14.199-33.065-21.08-68.258-21.08-104.735 0-48.52 11.921-93.428 35.807-134.509 23.971-41.231 56.886-73.947 98.039-98.04 41.146-24.092 85.99-36.142 134.502-36.142 48.52 0 93.649 12.121 134.845 36.142 41.446 24.164 74.283 56.879 98.375 98.039 24.092 41.153 36.135 85.99 36.135 134.509 0 48.521-11.964 93.735-36.128 135.189z"/><path d="M324.906 302.988V129.659c0-10.372-9.037-18.738-19.41-18.738-9.701 0-18.403 8.366-18.403 18.738v176.005c0 .336.671 1.678.671 2.678-.671 6.024 1.007 11.043 5.019 15.062L392.836 423.45c6.695 6.695 19.073 6.695 25.763 0 7.694-7.695 7.188-18.86 0-26.099l-93.693-94.363z"/></svg>
                    {todo.createdAt}
                  </td>
                  <td className="table__row__item">
                    <a href="#" className="lists__link">
                      <svg className="lists__link__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 469.331 469.331"><path d="M438.931 30.403c-40.4-40.5-106.1-40.5-146.5 0l-268.6 268.5c-2.1 2.1-3.4 4.8-3.8 7.7l-19.9 147.4c-.6 4.2.9 8.4 3.8 11.3 2.5 2.5 6 4 9.5 4 .6 0 1.2 0 1.8-.1l88.8-12c7.4-1 12.6-7.8 11.6-15.2-1-7.4-7.8-12.6-15.2-11.6l-71.2 9.6 13.9-102.8 108.2 108.2c2.5 2.5 6 4 9.5 4s7-1.4 9.5-4l268.6-268.5c19.6-19.6 30.4-45.6 30.4-73.3s-10.8-53.7-30.4-73.2zm-141.3 33l45.1 45.1-245.1 245.1-45.1-45.1 245.1-245.1zm-136.7 353.4l-44.1-44.1 245.1-245.1 44.1 44.1-245.1 245.1zm263.9-264.4l-107.9-107.9c13.7-11.3 30.8-17.5 48.8-17.5 20.5 0 39.7 8 54.2 22.4s22.4 33.7 22.4 54.2c0 18.1-6.2 35.1-17.5 48.8z"/></svg>
                    </a>

                    <a href="#" className="lists__link">
                    <svg className="lists__link__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 482.429 482.429"><path d="M381.163 57.799h-75.094C302.323 25.316 274.686 0 241.214 0c-33.471 0-61.104 25.315-64.85 57.799h-75.098c-30.39 0-55.111 24.728-55.111 55.117v2.828c0 23.223 14.46 43.1 34.83 51.199v260.369c0 30.39 24.724 55.117 55.112 55.117h210.236c30.389 0 55.111-24.729 55.111-55.117V166.944c20.369-8.1 34.83-27.977 34.83-51.199v-2.828c0-30.39-24.723-55.118-55.111-55.118zm-139.949-31.66c19.037 0 34.927 13.645 38.443 31.66h-76.879c3.515-18.016 19.406-31.66 38.436-31.66zm134.091 401.173c0 15.978-13 28.979-28.973 28.979H136.096c-15.973 0-28.973-13.002-28.973-28.979V170.861h268.182v256.451zm34.83-311.568c0 15.978-13 28.979-28.973 28.979H101.266c-15.973 0-28.973-13.001-28.973-28.979v-2.828c0-15.978 13-28.979 28.973-28.979h279.897c15.973 0 28.973 13.001 28.973 28.979v2.828z"/><path d="M171.144 422.863c7.218 0 13.069-5.853 13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07-7.217 0-13.069 5.854-13.069 13.07v147.154c-.001 7.217 5.851 13.068 13.069 13.068zM241.214 422.863c7.218 0 13.07-5.853 13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07-7.217 0-13.069 5.854-13.069 13.07v147.154c0 7.217 5.851 13.068 13.069 13.068zM311.284 422.863c7.217 0 13.068-5.853 13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07-7.219 0-13.07 5.854-13.07 13.07v147.154c-.001 7.217 5.853 13.068 13.07 13.068z"/></svg>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        :
          <p style={{marginTop: 40}}>No todos were found.</p>
        }
      </div>
    );
  }
}