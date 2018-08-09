import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addBet } from '../../actions/betsActions';

class BetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newBet = {
      amount: this.state.amount
    };
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="bet-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Amount</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Amount"
                  name="number"
                  value={this.state.amount}
                  onChange={this.onChange}
                  error={errors.amount}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Send Bet
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

BetForm.propTypes = {
  addBet: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addBet }
)(BetForm);
