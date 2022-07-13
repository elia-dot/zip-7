import {
  GET_LOGS,
  START_LOGS_LOADING,
  STOP_LOGS_LOADING,
} from '../actions/types';

const initialState = {
  logs: [],
  loading: false,
  error: null,
};

export default function logs(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_LOGS:
      return {
        ...state,
        logs: payload,
        loading: false,
        error: null,
      };
    case START_LOGS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOGS_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
