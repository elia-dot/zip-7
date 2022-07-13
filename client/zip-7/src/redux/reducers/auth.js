import {
  LOGIN,
  LOGIN_ERROR,
  SIGNUP,
  SIGNUP_ERROR,
  START_AUTH_LOADING,
  STOP_AUTH_LOADING,
  LOAD_USER,
  LOAD_USER_FAILED,
  LOGOUT,
} from '../actions/types';

const initialState = {
  isAuth: false,
  user: null,
  loading: false,
  error: null,
};

export default function auth(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
    case SIGNUP:
    case LOAD_USER:
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: payload,
        error: null,
      };
    case LOGIN_ERROR:
    case SIGNUP_ERROR:
    case LOAD_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuth: false,
        user: null,
      };
    case START_AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case STOP_AUTH_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
