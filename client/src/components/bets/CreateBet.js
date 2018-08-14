import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { addBet } from '../../actions/betsActions';
import { getEvent } from '../../actions/eventsActions';
import { getProfiles } from '../../actions/profileActions';

class CreateBet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      event: '',
      selectedPlayer: '',
      selectedTeam: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getProfiles();
    this.setState({ event: this.props.event.event._id });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newBet = {
      sender: user.id,
      receiver: this.state.selectedPlayer,
      eventId: this.state.event,
      senderPick: this.state.selectedTeam,
      amount: this.state.amount
    };
    console.log('bet', newBet);

    this.props.addBet(newBet, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    console.log('state', this.state);
    const { errors } = this.state;
    const { event, loading } = this.props.event;
    const { profiles } = this.props;

    let betContent;

    const teamOptions = [
      { label: '* Pick Team', value: 0 },
      { label: event.awayTeam.Name, value: event.awayTeam.Name },
      { label: event.homeTeam.Name, value: event.homeTeam.Name }
    ];

    let playerOptions;

    if (event === null || profiles === null || loading) {
      betContent = <Spinner />;
    } else {
      const players = profiles.map(profile => {
        return {
          label: profile.user.name,
          value: profile.user._id
        };
      });
      playerOptions = [{ label: '* Pick Player', value: 0 }, ...players];

      betContent = (
        <div className="bet-form mb-3">
          <div className="card card-info">
            <div className="card-header bg-info text-white">Bet Options</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <SelectListGroup
                    placeholder="Choose Player"
                    name="selectedPlayer"
                    value={this.state.selectedPlayer}
                    options={playerOptions}
                    onChange={this.onChange}
                    error={errors.receiver}
                    info="Choose player"
                  />
                  <SelectListGroup
                    placeholder="Pick a team"
                    name="selectedTeam"
                    value={this.state.selectedTeam}
                    options={teamOptions}
                    onChange={this.onChange}
                    error={errors.senderPick}
                    info="Pick a team"
                  />
                  <TextFieldGroup
                    placeholder="* Amount"
                    name="amount"
                    type="number"
                    value={this.state.amount}
                    onChange={this.onChange}
                    error={errors.amount}
                    info="Choose $ amount"
                  />
                </div>
                <button type="submit" className="btn btn-success">
                  Place Bet
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
            <div className="col-md-12">{betContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

CreateBet.propTypes = {
  addBet: PropTypes.func.isRequired,
  getEvent: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  profiles: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  event: state.events,
  profiles: state.profile.profiles
});

export default connect(
  mapStateToProps,
  { addBet, getEvent, getProfiles }
)(withRouter(CreateBet));
