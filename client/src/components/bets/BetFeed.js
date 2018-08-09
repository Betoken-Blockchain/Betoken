import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BetItem from './BetItem';

class BetFeed extends Component {
  render() {
    const { bets } = this.props;

    return bets.map(bet => <BetItem key={bet._id} bet={bet} />);
  }
}

BetFeed.propTypes = {
  bets: PropTypes.array.isRequired
};

export default BetFeed;
