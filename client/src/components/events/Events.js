import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import EventsHeader from './EventsHeader';
import EventFeed from './EventFeed';
import { getMLBEvents } from '../../actions/eventsActions';

class Events extends Component {
  componentDidMount() {
    this.props.getMLBEvents();
  }

  render() {
    const { events, loading } = this.props.events;
    let eventContent;

    if (events === null || loading) {
      eventContent = <Spinner />;
    } else {
      eventContent = <EventFeed events={events} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <EventsHeader />
              {eventContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Events.propTypes = {
  getMLBEvents: PropTypes.func.isRequired,
  events: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  events: state.events,
  sport: state.sport
});

export default connect(
  mapStateToProps,
  { getMLBEvents }
)(Events);
