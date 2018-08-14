import axios from 'axios';

import {
  ADD_BET,
  GET_ERRORS,
  GET_BETS,
  GET_BET,
  BETS_LOADING,
  CLEAR_ERRORS
} from './types';

// Add Bet
export const addBet = (betData, history) => dispatch => {
  axios
    .post('/api/bets', betData)
    .then(res =>
      dispatch({
        type: ADD_BET,
        payload: res.data
      })
    )
    .then(res => history.push('/feed'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Bets
export const getBets = () => dispatch => {
  dispatch(setBetLoading());
  axios
    .get('/api/bets')
    .then(res =>
      dispatch({
        type: GET_BETS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_BETS,
        payload: null
      })
    );
};

// Get Bet by Id
export const getBet = id => dispatch => {
  dispatch(setBetLoading());
  axios
    .get(`/api/bets/${id}`)
    .then(res =>
      dispatch({
        type: GET_BET,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_BET,
        payload: null
      })
    );
};

// Set loading state
export const setBetLoading = () => {
  return {
    type: BETS_LOADING
  };
};

// Clear Errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
