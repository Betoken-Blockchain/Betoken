import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEvent } from '../../actions/eventsActions';

class BetItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSender: false,
      isReceiver: false
    };
  }

  componentDidMount() {
    // Check if bet sender or receiver
    if (this.props.auth.user.id === this.props.bet.sender) {
      this.setState({ isSender: true });
    } else if (this.props.auth.user.id === this.props.bet.receiver) {
      this.setState({ isReceiver: true });
    }

    // Get event data
    // this.props.getEvent(this.props.bet.eventId);
  }

  render() {
    const { auth } = this.props;
    // const { event } = this.props.event;
    console.log(this.props);
    let betContent;

    if (auth) {
      betContent = (
        <div className="card card-body mb-2">
          <div className="games-schedule-items">
            <div className="row games-team">
              <div className="col-md-5">
                <span>Receiver</span>
              </div>
              <div className="col-md-2">
                <h4 className="img-circle">VS</h4>
              </div>
              <div className="col-md-5">
                <div className="row" />
                <span>Sender</span>
                <br />
                {auth.user.name}
              </div>
            </div>
            <div className="row games-info">
              <div className="col-md-12">
                <p>
                  <span className="glyphicon glyphicon-play-circle" />
                  Accepted?
                </p>
                <p className="games-dash" />
                <p>
                  <small>Event</small>
                  <br />
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
  getEvent: PropTypes.func.isRequired,
  bet: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getEvent }
)(BetItem);
