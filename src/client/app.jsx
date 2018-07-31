import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Login from './components/auth/login.jsx';
import Register from './components/auth/register.jsx';
import Nav from './components/layout/nav.jsx';
import Todo from './components/todo.jsx';

class App extends Component {
  render() {
    const authUser = JSON.parse(localStorage.getItem('user'));

    if (authUser) {
      axios.defaults.headers.common['Authorization'] = `JWT ${authUser.token}`;
    }

    return (
      <Router>
        <div className="container">
          {/* show nav only if user is not authenticated */}
          {!authUser && <Nav />}

          <Route exact path="/" render={(props) => <Redirect to={authUser ? '/todo' : '/login'} />}/>
          <Route exact path="/login" render={(props) => !authUser ? <Login {...props} authUser={authUser} /> : <Redirect to="/todo" />} />
          <Route exact path="/register" render={(props) => !authUser ? <Register {...props} authUser={authUser} /> : <Redirect to="/todo" />} />

          <Route exact path="/todo" render={(props) => <Todo {...props} authUser={authUser} />} />
        </div>
      </Router>
    );
  }
}

render(<App />, document.getElementById('app'));