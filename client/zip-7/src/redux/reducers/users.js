import {
    GET_USERS,
    START_USERS_LOADING,
    STOP_USERS_LOADING,
    TOGGLE_BLOCK,
    UPDATE_USER,
  } from '../actions/types';
  
  const initialState = {
    users: [],
    loading: false,
    error: null,
  };
  
  export default function users(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case GET_USERS:
        return {
          ...state,
          users: payload,
          loading: false,
          error: null,
        };
      case UPDATE_USER:
        return {
          ...state,
          users: state.users.map(user =>
            user._id === payload._id ? payload : user
          ),
          loading: false,
        };
      case TOGGLE_BLOCK: 
        return {
          ...state,
          users: state.users.map(user => user._id === payload._id ? payload : user),
          loading: false,
        };
      case START_USERS_LOADING:
        return {
          ...state,
          loading: true,
        };
      case STOP_USERS_LOADING:
        return {
          ...state,
          loading: false,
        };
      default:
        return state;
    }
  }
  