import {
  GET_NOTIFICATIONS,
  READ_NOTIFICATION,
  START_NOTIFICATIONS_LOADING,
  STOP_NOTIFICATIONS_LOADING,
} from '../actions/types';

const initialState = {
  messages: [],
  loading: false,
  error: null,
};

export default function notifications(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_NOTIFICATIONS:
      return {
        ...state,
        messages: payload,
        loading: false,
        error: null,
      };
    case READ_NOTIFICATION:
      return {
        ...state,
        messages: state.messages.map(message =>
          message._id === payload ? { ...message, isRead: true } : message
        ),
        loading: false,
      };
    case START_NOTIFICATIONS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case STOP_NOTIFICATIONS_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
