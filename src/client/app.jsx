import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Login from './components/auth/login.jsx';
import Register from './components/auth/register.jsx';
import Nav from './components/layout/nav.jsx';
import Todo from './components/todo.jsx';
import AuthUser from './helpers/auth-user';

class App extends Component {
  render() {
    const authUser = AuthUser.get();

    if (authUser) {
      axios.defaults.headers.common['Authorization'] = `JWT ${authUser.token}`;
    }

    return (
      <Router>
        <div className="container">
          <Nav />

          <Route exact path="/" render={() => <Redirect to={authUser ? '/todo' : '/login'} />}/>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/todo" component={Todo} />
        </div>
      </Router>
    );
  }
}

render(<App />, document.getElementById('app'));