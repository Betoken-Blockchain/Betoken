import axios from 'axios';

import { EVENTS_LOADING, GET_MLB_EVENTS, GET_MLB_EVENT } from './types';

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

// Get event by id
export const getEvent = id => dispatch => {
  dispatch(setEventsLoading());
  axios
    .get(`/api/mlb/${id}`)
    .then(res =>
      dispatch({
        type: GET_MLB_EVENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_MLB_EVENT,
        payload: null
      })
    );
};

export const setEventsLoading = () => {
  return {
    type: EVENTS_LOADING
  };
};
