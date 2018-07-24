import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { loginUser } from '../../actions/authActions';

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

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <h1>Login</h1>

        <div className="col-md-6">
          <div id="logbox">
            <form onSubmit={this.onSubmit}>
              <h1>account login</h1>
              <input
                className={classnames('input pass form-control', {
                  'is-invalid': errors.email
                })}
                name="email"
                type="email"
                placeholder="enter your email"
                value={this.state.email}
                onChange={this.onChange}
                autoFocus
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
                placeholder="enter your password"
                value={this.state.password}
                onChange={this.onChange}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
