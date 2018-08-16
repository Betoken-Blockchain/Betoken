import { ADD_BET, GET_BETS, DELETE_BET, BETS_LOADING } from '../actions/types';

const initialState = {
  bets: [],
  bet: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
  case BETS_LOADING:
    return {
      ...state,
      loading: true
    };
  case GET_BETS:
    return {
      ...state,
      bets: action.payload,
      loading: false
    };
  case ADD_BET:
    return {
      ...state,
      bets: [action.payload, ...state.bets]
    };
  case DELETE_BET:
    return {
      ...state,
      bets: state.bets.filter(bet => bet._id !== action.payload)
    };
  default:
    return state;
  }
}
