import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import './Events.css';
class EventItem extends Component {
  render() {
    const { event, showActions } = this.props;

    return (
      <div key={event._id} className="card card-body mb-2">
        <div className="games-schedule-items">
          <div className="row games-team">
            <div className="col-md-5">
              <img
                className="mlb-logos"
                src={require(`../../img/mlb/${
                  event.awayTeam.Abbreviation
                }.png`)}
                alt="Away Team"
              />
              <br />
              <span>
                {event.awayTeam.City} {event.awayTeam.Name}
              </span>
            </div>
            <div className="col-md-2">
              <h4 className="img-circle">VS</h4>
              <br />
              {showActions ? (
                <Link
                  to={`/event/${event._id}`}
                  className="btn btn-success"
                  style={{ fontSize: '20px', padding: '5% 20%' }}
                >
                  Bet
                </Link>
              ) : null}
            </div>
            <div className="col-md-5">
              <img
                className="mlb-logos"
                src={require(`../../img/mlb/${
                  event.homeTeam.Abbreviation
                }.png`)}
                alt="Home Team"
              />
              <br />
              <span>
                {event.homeTeam.City} {event.homeTeam.Name}
              </span>
            </div>
          </div>
          <div className="row games-info">
            <div className="col-md-12">
              <p>
                <span className="glyphicon glyphicon-play-circle" />
                <Moment format="MMM DD, YYYY">{event.date}</Moment> (
                <small>{event.time}</small>)
              </p>
              <p className="games-dash" />
              <p>
                <small>
                  {event.location}, {event.homeTeam.City}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EventItem.defaultProps = {
  showActions: true
};

Event.propTypes = {
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(EventItem);
