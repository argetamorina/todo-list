import React, { Component } from 'react';
import axios from 'axios';
import AuthUser from '../../helpers/auth-user';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: ''
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onRegister = this.onRegister.bind(this);
  }

  componentWillMount() {
    const authUser = AuthUser.get();

    // before loading register, redirect to todo if user is authenticated
    if (authUser) {
      this.props.history.push('/todo');
      return;
    }
  }

  onNameChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  onEmailChange(e) {
    this.setState({
      email: e.target.value
    });
  }

  onPasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  onRegister(e) {
    e.preventDefault();

    axios.post('/api/auth/register', {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password  
    })
    .then(user => {
      this.props.history.push('/login');
    })
    .catch(err => alert(err.response.data.message));
  }

  render() {
    return (
      <div className="register">
        <h3 className="register__title">Sign Up</h3>
        <form onSubmit={this.onRegister}>
          <input className="register__input" value={this.state.name} onChange={this.onNameChange} type="text" placeholder="Name" />

          <input className="register__input" value={this.state.email} onChange={this.onEmailChange} type="text" placeholder="Email" />

          <input className="register__input" value={this.state.password} onChange={this.onPasswordChange} type="password" placeholder="Password" />

          <button className="register__btn">Enter <svg className="register__btn__arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129"><path d="M40.4 121.3c-.8.8-1.8 1.2-2.9 1.2s-2.1-.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8 0l53.9 53.9c1.6 1.6 1.6 4.2 0 5.8l-53.9 53.9z"/></svg></button>
        </form>
      </div>
    );
  }
}