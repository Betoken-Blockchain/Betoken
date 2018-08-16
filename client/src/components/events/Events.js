import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import classnames from 'classnames';
import Spinner from '../common/Spinner';
import EventsHeader from './EventsHeader';
import EventFeed from './EventFeed';
import { getMLBEvents } from '../../actions/eventsActions';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDateBtn: 'today',
      displayDate: moment(new Date()).format('YYYY-MM-DD')
    };

    this.onSelectDate = this.onSelectDate.bind(this);
  }

  componentDidMount() {
    this.props.getMLBEvents();
  }

  onSelectDate(date, day) {
    this.setState({ displayDate: date });
    this.setState({ selectedDateBtn: day });
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
    let eventSelect = (
      <div className="dates">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="btn-group">
                <button
                  onClick={() => this.onSelectDate(today, 'today')}
                  type="button"
                  className={classnames('btn', {
                    'btn-primary': this.state.selectedDateBtn === 'today',
                    'btn-outline-primary':
                      this.state.selectedDateBtn !== 'today'
                  })}
                >
                  Today
                </button>
                <button
                  onClick={() => this.onSelectDate(tomorrow, 'tomorrow')}
                  type="button"
                  className={classnames('btn', {
                    'btn-primary': this.state.selectedDateBtn === 'tomorrow',
                    'btn-outline-primary':
                      this.state.selectedDateBtn !== 'tomorrow'
                  })}
                >
                  Tomorrow
                </button>
                <button
                  onClick={() =>
                    this.onSelectDate(twoDaysFromNow, 'twoDaysFromNow')
                  }
                  type="button"
                  className={classnames('btn', {
                    'btn-primary':
                      this.state.selectedDateBtn === 'twoDaysFromNow',
                    'btn-outline-primary':
                      this.state.selectedDateBtn !== 'twoDaysFromNow'
                  })}
                >
                  {moment(twoDaysFromNow).format('MMM DD')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

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
              {eventSelect}
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
