import { EVENTS_LOADING, GET_MLB_EVENTS } from '../actions/types';

const initialState = {
  events: [],
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
  default:
    return state;
  }
}
