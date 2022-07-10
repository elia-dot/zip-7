import {
  ICOUNT_LOGIN,
  START_ICOUNT_LOADING,
  STOP_ICOUNT_LOADING,
} from '../actions/types';

const initialState = {
  sessionId: null,
  clients:[],
  loading: false,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ICOUNT_LOGIN:
      return {
        ...state,
        sessionId: payload,
        loading: false,
        error: null,
      };
    case START_ICOUNT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case STOP_ICOUNT_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
