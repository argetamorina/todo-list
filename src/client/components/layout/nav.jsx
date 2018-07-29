import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class extends Component {
  render () {
    return (
      <div className="navigation">
        <Link to="/login" className="navigation__link">Login</Link>
        <Link to="/register" className="navigation__link">Register</Link>
      </div>
    );
  }
}