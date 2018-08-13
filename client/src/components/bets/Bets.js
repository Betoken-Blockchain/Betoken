import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BetFeed from './BetFeed';
import Spinner from '../common/Spinner';
import { getBets } from '../../actions/betsActions';

class Bets extends Component {
  componentDidMount() {
    this.props.getBets();
  }

  render() {
    const { bets, loading } = this.props.bets;
    let betContent;

    if (bets === null || loading) {
      betContent = <Spinner />;
    } else {
      betContent = <BetFeed bets={bets} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>Bets Made</h1>
              {betContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Bets.propTypes = {
  getBets: PropTypes.func.isRequired,
  bets: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  bets: state.bets
});

export default connect(
  mapStateToProps,
  { getBets }
)(Bets);
