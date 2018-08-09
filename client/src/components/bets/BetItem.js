import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

class BetItem extends Component {
  render() {
    const { bet, auth } = this.props;

    return (
      <div className="card card-body mb-2">
        <div className="games-schedule-items">
          <div className="row games-team">
            <div className="col-md-5">
              <span>Receiver</span>
            </div>
            <div className="col-md-2">
              <h4 className="img-circle">VS</h4>
            </div>
            <div className="col-md-5">
              <div className="row" />
              <span>Sender</span>
              <br />
              {auth.user.name}
            </div>
          </div>
          <div className="row games-info">
            <div className="col-md-12">
              <p>
                <span className="glyphicon glyphicon-play-circle" />
                Accepted?
              </p>
              <p className="games-dash" />
              <p>
                <small>Event</small>
                <br />
                {bet.senderPick}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BetItem.propTypes = {
  bet: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(BetItem);
