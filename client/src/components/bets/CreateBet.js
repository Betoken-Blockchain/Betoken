import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addBet } from '../../actions/betsActions';
import { getEvent } from '../../actions/eventsActions';

class CreateBet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getEvent(this.props.match.params.id);
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
    const { event, loading } = this.props.event;

    let eventContent;

    if (event === null || loading) {
      eventContent = <Spinner />;
    } else {
      // console.log(event);
      eventContent = (
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
                <button type="submit" className="btn btn-success">
                  Send Bet
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <Link to="/events" className="btn btn-light mb-3">
              Back To Games
            </Link>
            <div className="col-md-12">{eventContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

CreateBet.propTypes = {
  addBet: PropTypes.func.isRequired,
  getEvent: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  event: state.events
});

export default connect(
  mapStateToProps,
  { addBet, getEvent }
)(CreateBet);
