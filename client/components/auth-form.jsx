import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const { action } = this.props;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/auth/${action}`, req)
      .then(res => res.json())
      .then(result => {
        if (action === 'register') {
          window.location.hash = 'sign-in';
        } else if (result.user && result.token) {
          this.props.onSignIn(result);
        }
      })
      .catch(err => console.error(err));

    form.reset();
  }

  handleDemo(event) {
    event.preventDefault();
    const demoSignIn = {
      username: 'guest',
      password: 'guest'
    };
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(demoSignIn)
    };
    fetch('/api/auth/sign-in', req)
      .then(res => res.json())
      .then(result => {
        if (result.user && result.token) {
          this.props.onSignIn(result);
        }
      })
      .catch(err => console.error(err));
  }

  render() {
    const { action } = this.props;
    return (
      <div className="register-container">
        <div className="row justify-center align-center register-sign-in-margin">
          <h2>
            {
              action === 'register'
                ? 'Register'
                : 'Sign In'
            }
          </h2>
        </div>
        <form onSubmit={this.handleSubmit} className="sign-in-width">
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
                type="password"
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
                {
                  action === 'register'
                    ? 'Register'
                    : 'Sign In'
                }
              </button>
            </div>
            <div>
              <p className="itinerary-margin account-font">
                {
                  action === 'register'
                    ? 'Already have an account?'
                    : "Don't have an account?"
                }
                <a className="auth-link-margin"
                  href={
                    action === 'register'
                      ? '#sign-in'
                      : '#register'
                  }>
                  {
                    action === 'register'
                      ? 'Sign In'
                      : 'Sign Up'
                  }
                </a>
              </p>
            </div>
            <hr></hr>
            <div>
              <button
              id="demo"
              type="submit"
              className="register-sign-in-button poppins title-margin">
                Demo Sign In
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
