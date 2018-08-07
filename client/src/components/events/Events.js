import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getMLBEvents } from '../../actions/eventsActions';
import EventsHeader from './EventsHeader';
import EventsList from './EventsList';

class Events extends Component {
  componentDidMount() {
    this.props.getMLBEvents();
  }

  render() {
    const { events, loading, sport } = this.props.events;
    let eventContent;

    if (events === null || loading) {
      eventContent = <Spinner />;
    } else {
      eventContent = (
        <div>
          <EventsHeader sport={sport} />
          <EventsList events={events} />
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{eventContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Events.propTypes = {
  getMLBEvents: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  events: state.events,
  sport: state.sport
});

export default connect(
  mapStateToProps,
  { getMLBEvents }
)(Events);
