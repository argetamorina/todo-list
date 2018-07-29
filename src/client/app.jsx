import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/auth/login.jsx';
import Register from './components/auth/register.jsx';
import Nav from './components/layout/nav.jsx';
import Todo from './components/todo.jsx';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Nav />

          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />

          <Route exact path="/todo" component={Todo} />
        </div>
      </Router>
    );
  }
}

render(<App />, document.getElementById('app'));