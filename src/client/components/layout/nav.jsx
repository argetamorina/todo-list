import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthUser from '../../helpers/auth-user';

export default class extends Component {
  render () {
    const authUser = AuthUser.get();

    if (authUser) {
      return null;
    }

    return (
      <div className="navigation">
        <Link to="/login" className="navigation__link">Login</Link>
        <Link to="/register" className="navigation__link">Register</Link>
      </div>
    );
  }
}