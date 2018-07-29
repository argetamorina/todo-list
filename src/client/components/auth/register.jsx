import React, { Component } from 'react';

export default class extends Component {
  render() {
    return (
      <div className="register">
        <div class="row">
          <div class="col-md-4 offset-4">
            <h3 class="register__title">Sign Up</h3>
            <form action="#">
              <input class="register__input" type="text" placeholder="Name" />

              <input class="register__input" type="text" placeholder="Username" />

              <input class="register__input" type="text" placeholder="Email" />

              <input class="register__input" type="text" placeholder="Password" />

              <button class="register__btn">Enter <svg class="register__btn__arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129"><path d="M40.4 121.3c-.8.8-1.8 1.2-2.9 1.2s-2.1-.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8 0l53.9 53.9c1.6 1.6 1.6 4.2 0 5.8l-53.9 53.9z"/></svg></button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}