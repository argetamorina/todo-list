import React, { Component } from 'react';
import axios from 'axios';
import AuthUser from '../../helpers/auth-user';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  componentWillMount() {
    const authUser = AuthUser.get();

    // before loading login, redirect to todo if user is authenticated
    if (authUser) {
      this.props.history.push('/todo');
      return;
    }
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

  onLogin(e) {
    e.preventDefault();

    axios.post('/api/auth/login', {
      email: this.state.email,
      password: this.state.password
    })
      .then(response => {
        const authUser = response.data;
        localStorage.setItem('user', JSON.stringify(authUser));
        this.props.history.push('/todo');
      })
      .catch(err => alert(err.response.data.message));
  }

  render() {
    return (
      <div className="login">
        <h3 className="login__title">Welcome</h3>
        <form onSubmit={this.onLogin}>
          <div className="login__item">
            <svg className="login__item__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M437.02 330.98c-27.883-27.882-61.071-48.523-97.281-61.018C378.521 243.251 404 198.548 404 148 404 66.393 337.607 0 256 0S108 66.393 108 148c0 50.548 25.479 95.251 64.262 121.962-36.21 12.495-69.398 33.136-97.281 61.018C26.629 379.333 0 443.62 0 512h40c0-119.103 96.897-216 216-216s216 96.897 216 216h40c0-68.38-26.629-132.667-74.98-181.02zM256 256c-59.551 0-108-48.448-108-108S196.449 40 256 40s108 48.448 108 108-48.449 108-108 108z"/></svg>
            <input className="login__item__input" value={this.state.email} onChange={this.onEmailChange} type="text" placeholder="Email" />
          </div>

          <div className="login__item">
            <svg className="login__item__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M230.792 354.313l-6.729 60.51a10.67 10.67 0 0 0 10.604 11.844h42.667a10.67 10.67 0 0 0 10.604-11.844l-6.729-60.51c10.927-7.948 17.458-20.521 17.458-34.313 0-23.531-19.135-42.667-42.667-42.667S213.333 296.469 213.333 320c0 13.792 6.532 26.365 17.459 34.313zM256 298.667c11.76 0 21.333 9.573 21.333 21.333 0 8.177-4.646 15.5-12.125 19.125a10.673 10.673 0 0 0-5.958 10.781l6.167 55.427h-18.833l6.167-55.427c.5-4.49-1.885-8.802-5.958-10.781-7.479-3.625-12.125-10.948-12.125-19.125-.001-11.76 9.572-21.333 21.332-21.333z"/><path d="M437.333 192h-32v-42.667C405.333 66.99 338.344 0 256 0S106.667 66.99 106.667 149.333V192h-32A10.66 10.66 0 0 0 64 202.667v266.667C64 492.865 83.135 512 106.667 512h298.667C428.865 512 448 492.865 448 469.333V202.667A10.66 10.66 0 0 0 437.333 192zM128 149.333c0-70.583 57.417-128 128-128s128 57.417 128 128V192h-21.333v-42.667c0-58.813-47.854-106.667-106.667-106.667S149.333 90.521 149.333 149.333V192H128v-42.667zm213.333 0V192H170.667v-42.667C170.667 102.281 208.948 64 256 64s85.333 38.281 85.333 85.333zm85.334 320c0 11.76-9.573 21.333-21.333 21.333H106.667c-11.76 0-21.333-9.573-21.333-21.333v-256h341.333v256z"/></svg>
            <input className="login__item__input" value={this.state.password} onChange={this.onPasswordChange} type="password" placeholder="Password" />
          </div>

          <button className="login__btn">Enter <svg className="login__btn__arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129"><path d="M40.4 121.3c-.8.8-1.8 1.2-2.9 1.2s-2.1-.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8 0l53.9 53.9c1.6 1.6 1.6 4.2 0 5.8l-53.9 53.9z"/></svg></button>
        </form>
      </div>
    );
  }
}