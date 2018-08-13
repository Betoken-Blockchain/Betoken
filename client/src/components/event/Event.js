import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import EventItem from '../events/EventItem';
import Spinner from '../common/Spinner';
import { getEvent } from '../../actions/eventsActions';

class Event extends Component {
  componentDidMount() {
    this.props.getEvent(this.props.match.params.id);
  }

  render() {
    const { loading } = this.props;
    const { event } = this.props.event;
    let eventContent;

    if (event === null || loading) {
      eventContent = <Spinner />;
    } else {
      // eventContent = <div>{<EventItem event={event} />}</div>;
      eventContent = <div>{event.location}</div>;
    }

    return (
      <div className="event">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/events" className="btn btn-light mb-3">
                Back to Games
              </Link>
              {eventContent}
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
