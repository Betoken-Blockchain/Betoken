import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    console.log('user', user);
  }

  render() {
    return (
      <div>
        <h1>Login</h1>

        <div className="col-md-6">
          <div id="logbox">
            <form onSubmit={this.onSubmit}>
              <h1>account login</h1>
              <input
                className="input pass form-control"
                name="email"
                type="email"
                placeholder="enter your email"
                value={this.state.email}
                onChange={this.onChange}
                autoFocus
              />
              <input
                className="input pass form-control"
                name="password"
                type="password"
                placeholder="enter your password"
                value={this.state.password}
                onChange={this.onChange}
              />
              <input
                className="inputButton"
                type="submit"
                value="Sign me in!"
              />
              <div className="text-center">
                <Link to="/register">create an account</Link> -{' '}
                <Link to="/">forgot password</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
