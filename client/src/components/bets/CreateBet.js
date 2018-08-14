import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
      selectedPlayer: '',
      selectedTeam: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getProfiles();
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
    const { profiles } = this.props.profiles;

    let betContent;

    // Select Team
    const teamOptions = [
      { label: '* Pick Team', value: 0 },
      { label: event.awayTeam.Name, value: event.awayTeam.Name },
      { label: event.homeTeam.Name, value: event.homeTeam.Name }
    ];
    const playerOptions = [{ label: '* Pick Player', value: 0 }];

    if (event === null || profiles === null || loading) {
      betContent = <Spinner />;
    } else {
      const playerOptions = profiles.map(profile => [
        {
          label: profile.user._id,
          value: profile.user._id
        }
      ]);

      console.log('players: ', playerOptions);
    }

    if (playerOptions === null) {
      console.log('No players yet');
    } else {
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
                    error={errors.selectedPlayer}
                    info="Choose player"
                  />
                  <SelectListGroup
                    placeholder="Pick a team"
                    name="profile"
                    value={this.state.selectedTeam}
                    options={teamOptions}
                    onChange={this.onChange}
                    error={errors.selectedTeam}
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
  profiles: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  event: state.events,
  profiles: state.profile
});

export default connect(
  mapStateToProps,
  { addBet, getEvent, getProfiles }
)(CreateBet);
