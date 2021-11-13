import React from 'react';

export default class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  render() {
    return (
      <div className="register-container">
        <div className="row justify-center align-center register-sign-in-margin">
          <h2>Register</h2>
        </div>
        <form>
          <div className="flex justify-center align-center flex-column">
            <div>
              <input
                required
                id="username"
                type="text"
                name="username"
                placeholder="Username"
                onChange={this.handleChange}
                className="initiate-input poppins">
              </input>
            </div>
            <div>
              <input
                required
                id="password"
                type="text"
                name="password"
                placeholder="Password"
                onChange={this.handleChange}
                className="initiate-input initiate-margin poppins">
              </input>
            </div>
            <div className="flex justify-center plan-button-margin">
              <button
                id="register"
                type="submit"
                className="register-sign-in-button poppins">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
