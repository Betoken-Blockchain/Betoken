import {
  EVENTS_LOADING,
  GET_MLB_EVENTS,
  GET_MLB_EVENT
} from '../actions/types';

const initialState = {
  events: [],
  event: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
  case EVENTS_LOADING:
    return {
      ...state,
      loading: true
    };
  case GET_MLB_EVENTS:
    return {
      ...state,
      events: action.payload,
      sport: 'MLB',
      loading: false
    };
  case GET_MLB_EVENT:
    return {
      ...state,
      event: action.payload,
      loading: false
    };
  default:
    return state;
  }
}
