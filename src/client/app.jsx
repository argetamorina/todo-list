import React, { Component } from 'react';
import { render } from 'react-dom';
import Login from './components/auth/login.jsx';
import Register from './components/auth/register.jsx';
import Nav from './components/layout/nav.jsx';
import Lists from './components/lists.jsx';

class App extends Component {
  render() {
    return (
      <div className="container">
        {/* <Nav /> */}

        <Lists />
        {/* <Register /> */}
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));