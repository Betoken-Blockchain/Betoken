import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../events/Events.css';

class BetItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSender: false,
      isReceiver: false,
      accepted: false
    };
  }

  componentDidMount() {
    // Check if bet sender or receiver
    if (this.props.auth.user.id === this.props.bet.sender) {
      this.setState({ isSender: true });
    } else if (this.props.auth.user.id === this.props.bet.receiver) {
      this.setState({ isReceiver: true });
    }

    this.setState({ accepted: this.props.bet.accepted });
  }

  render() {
    const { auth, bet } = this.props;
    console.log('Props: ', this.props);
    console.log('State: ', this.state);

    let acceptButton;
    if (this.state.accepted === false) {
      if (auth.user.id === bet.sender._id) {
        acceptButton = (
          <button type="button" class="btn btn-danger accept-button">
            Cancel Bet
          </button>
        );
      } else if (auth.user.id === bet.receiver._id) {
        acceptButton = (
          <button type="button" class="btn btn-success accept-button">
            Accept Bet
          </button>
        );
      } else {
        null;
      }
    } else {
      acceptButton = null;
    }

    let acceptedBadge;
    if (this.state.accepted === false) {
      acceptedBadge = (
        <span class="badge badge-warning accepted-badge">Not Accepted</span>
      );
    }

    let betContent;
    if (bet) {
      betContent = (
        <div className="card card-body mb-2">
          <div className="games-schedule-items">
            <div className="row games-team">
              <div className="col-md-5">
                <h3>{bet.receiver.name}</h3>
              </div>
              <div className="col-md-2">{acceptButton}</div>
              <div className="col-md-5">
                <div className="row" />
                <h3>{bet.sender.name}</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-md-5">
                <img
                  className="mlb-logos"
                  src={require(`../../img/mlb/${bet.receiverPick}.png`)}
                  alt="Away Team"
                  style={{ width: '30%', height: 'auto' }}
                />
              </div>
              <div className="col-md-2">
                <h2>${bet.amount}</h2>
              </div>
              <div className="col-md-5">
                <div className="row" />
                <img
                  className="mlb-logos"
                  src={require(`../../img/mlb/${bet.senderPick}.png`)}
                  alt="Away Team"
                  style={{ width: '30%', height: 'auto' }}
                />
              </div>
            </div>
            <div className="row games-info">
              <div className="col-md-12">
                {acceptedBadge}
                <p className="games-dash" />
                <p>
                  <small>
                    <strong>
                      {bet.event.awayTeam.City} {bet.event.awayTeam.Name} vs.{' '}
                      {bet.event.homeTeam.City} {bet.event.homeTeam.Name}
                    </strong>
                    | {bet.event.time} {bet.event.date} at {bet.event.location}
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return <div>{betContent}</div>;
  }
}

BetItem.propTypes = {
  bet: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(BetItem);
