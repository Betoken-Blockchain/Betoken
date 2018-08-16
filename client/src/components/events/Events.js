import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import Spinner from '../common/Spinner';
import EventsHeader from './EventsHeader';
import EventFeed from './EventFeed';
import { getMLBEvents } from '../../actions/eventsActions';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // displayDate: moment(new Date()).format('YYYY-MM-DD')
      displayDate: '2018-08-07'
    };
  }

  componentDidMount() {
    this.props.getMLBEvents();
  }

  render() {
    // Event date display
    let today = moment(new Date()).format('YYYY-MM-DD');
    let tomorrow = moment(new Date())
      .add(1, 'days')
      .format('YYYY-MM-DD');
    let twoDaysFromNow = moment(new Date())
      .add(2, 'days')
      .format('YYYY-MM-DD');

    // Filter event dates
    const { events, loading } = this.props.events;
    let eventContent;

    let selectedEvents = events.filter(
      event => event.date === this.state.displayDate
    );
    console.log(selectedEvents);

    if (events === null || loading) {
      eventContent = <Spinner />;
    } else {
      eventContent = <EventFeed events={selectedEvents} />;
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
