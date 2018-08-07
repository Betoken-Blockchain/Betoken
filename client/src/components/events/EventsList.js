import React, { Component } from 'react';
import Moment from 'react-moment';

import './Events.css';

class EventsList extends Component {
  render() {
    const { events } = this.props;

    const eventsItem = events.map(event => (
      <div key={events.id} className="card card-body mb-2">
        <div className="games-schedule-items">
          <div className="row games-team">
            <div className="col-md-5">
              <img src="http://placehold.it/115x67" alt="Away Team" />
              <span>
                {event.awayTeam.City} {event.awayTeam.Name}
              </span>
            </div>
            <div className="col-md-2">
              <h4 className="img-circle">VS</h4>
            </div>
            <div className="col-md-5">
              <img src="http://placehold.it/115x67" alt="Home Team" />
              <span>
                {event.homeTeam.City} {event.homeTeam.Name}
              </span>
            </div>
          </div>
          <div className="row games-info">
            <div className="col-md-12">
              <p>
                <span className="glyphicon glyphicon-play-circle" />
                <Moment format="MMM do, YYYY">{event.date}</Moment> (<small>
                  {event.time}
                </small>)
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
        <h3 class="mb-4">Upcoming Games</h3>
        {eventsItem}
      </div>
    );
  }
}

export default EventsList;
