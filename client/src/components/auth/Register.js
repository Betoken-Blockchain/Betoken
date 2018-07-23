import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
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
      .catch(err => this.setState({ errors: err.response.data }));
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <h1>Register</h1>
        <div className="col-md-6">
          <div id="logbox">
            <form noValidate onSubmit={this.onSubmit}>
              <h1>create an account</h1>
              <input
                autoFocus
                className={classnames('input pass form-control', {
                  'is-invalid': errors.name
                })}
                name="name"
                type="text"
                placeholder="What's your name?"
                value={this.state.name}
                onChange={this.onChange}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
              <input
                className={classnames('input pass form-control', {
                  'is-invalid': errors.email
                })}
                name="email"
                type="email"
                placeholder="Email address"
                value={this.state.email}
                onChange={this.onChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
              <input
                className={classnames('input pass form-control', {
                  'is-invalid': errors.password
                })}
                name="password"
                type="password"
                placeholder="Choose a password"
                value={this.state.password}
                onChange={this.onChange}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
              <input
                className={classnames('input pass form-control', {
                  'is-invalid': errors.password2
                })}
                name="password2"
                type="password"
                placeholder="Confirm password"
                value={this.state.password2}
                onChange={this.onChange}
              />
              {errors.password2 && (
                <div className="invalid-feedback">{errors.password2}</div>
              )}
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
