import React, { Component } from 'react';

class EventsHeader extends Component {
  render() {
    const { sport } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row" />
            <div className="text-center">
              <h1 className="display-4 text-center">{sport}</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EventsHeader;
