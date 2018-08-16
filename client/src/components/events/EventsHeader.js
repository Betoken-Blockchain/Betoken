import React, { Component } from 'react';
import MLBLogo from '../../img/mlb/MLB-Logo.png';
class EventsHeader extends Component {
  render() {
    let mlbHeader = (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb3">
            <div className="text-center">
              <img
                src={MLBLogo}
                style={{ width: '25%', height: 'augo' }}
                alt="mlb logo"
              />
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="text-white mb-3">
            <div className="text-center">{mlbHeader}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default EventsHeader;
