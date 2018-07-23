import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    console.log('input: ', newUser);
    axios
      .post('/api/users/register', newUser)
      .then(res => console.log('newUser: ', res.data))
      .catch(err => console.log(err.response.data));
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
        <div className="col-md-6">
          <div id="logbox">
            <form onSubmit={this.onSubmit}>
              <h1>create an account</h1>
              <input
                className="input pass"
                name="name"
                type="text"
                placeholder="What's your name?"
                value={this.state.name}
                onChange={this.onChange}
                autoFocus
              />
              <input
                className="input pass"
                name="email"
                type="email"
                placeholder="Email address"
                value={this.state.email}
                onChange={this.onChange}
              />
              <input
                className="input pass"
                name="password"
                type="password"
                placeholder="Choose a password"
                value={this.state.password}
                onChange={this.onChange}
              />
              <input
                className="input pass"
                name="password2"
                type="password"
                placeholder="Confirm password"
                value={this.state.password2}
                onChange={this.onChange}
              />
              <input
                className="inputButton"
                type="submit"
                value="Sign me up!"
              />
              <div className="text-center">
                already have an account? <Link to="/login">login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
