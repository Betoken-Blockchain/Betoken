import axios from 'axios';

import { EVENTS_LOADING, GET_MLB_EVENTS } from './types';

// Get MLB Events
export const getMLBEvents = () => dispatch => {
  dispatch(setEventsLoading());
  axios
    .get('/api/mlb')
    .then(res =>
      dispatch({
        type: GET_MLB_EVENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_MLB_EVENTS,
        payload: null
      })
    );
};

export const setEventsLoading = () => {
  return {
    type: EVENTS_LOADING
  };
};
