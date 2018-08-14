import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import EventItem from '../events/EventItem';
import CreateBet from '../bets/CreateBet';
import Spinner from '../common/Spinner';
import { getEvent } from '../../actions/eventsActions';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      receiverProfile: {},
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getEvent(this.props.match.params.id);
  }

  render() {
    const { loading } = this.props;
    const { event } = this.props.event;
    let eventContent;
    let betContent;

    if (event === null || loading || Object.keys(event).length === 0) {
      eventContent = <Spinner />;
    } else {
      eventContent = (
        <div>{<EventItem event={event} showActions={false} />}</div>
      );
      betContent = <CreateBet event={event} />;
    }

    return (
      <div className="event">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/events" className="btn btn-secondary mb-3">
                Back to Games
              </Link>
              {eventContent}
            </div>
            <div
              className="col-md-8 col-md-offset-2"
              style={{ margin: '0 auto' }}
            >
              {betContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Event.propTypes = {
  getEvent: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  event: state.events
});

export default connect(
  mapStateToProps,
  { getEvent }
)(Event);
