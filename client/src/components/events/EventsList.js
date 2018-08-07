import React, { Component } from 'react';
import Moment from 'react-moment';

class EventsList extends Component {
  render() {
    const { events } = this.props;

    const eventsItem = events.map(event => (
      <div key={events.id} class="card card-body mb-2">
        <div class="row">
          <div class="col-md-6">
            <span class="badge badge-info mr-1">
              {event.homeTeam.City} {event.homeTeam.Name}
            </span>
            <span class="badge badge-secondary mr-1">@ {event.location}</span>
            <span class="badge badge-success">
              {event.awayTeam.City} {event.awayTeam.Name}
            </span>
          </div>
          <div class="col-md-6">
            <p>
              <Moment format="MMMM do, YYYY">{event.date}</Moment>
            </p>
            <p>{event.time}</p>
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
