import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import './Events.css';

class EventsList extends Component {
  render() {
    const { events } = this.props;

    const eventsItem = events.map(event => (
      <div key={event.id} className="card card-body mb-2">
        <div className="games-schedule-items">
          <div className="row games-team">
            <div className="col-md-5">
              <img
                src={require(`../../img/mlb/${
                  event.awayTeam.Abbreviation
                }.png`)}
                alt="Away Team"
              />
              <span>
                {event.awayTeam.City} {event.awayTeam.Name}
              </span>
            </div>
            <div className="col-md-2">
              <h4 className="img-circle">VS</h4>
              <br />
              <Link to={'/profile/'} className="btn btn-success">
                Bet
              </Link>
            </div>
            <div className="col-md-5">
              <img
                src={require(`../../img/mlb/${
                  event.homeTeam.Abbreviation
                }.png`)}
                alt="Home Team"
              />
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
    ));

    return (
      <div ref="myRef">
        <hr />
        <h3 className="mb-4">Upcoming Games</h3>
        {eventsItem}
      </div>
    );
  }
}

export default EventsList;
