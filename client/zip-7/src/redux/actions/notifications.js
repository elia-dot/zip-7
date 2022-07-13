import axios from 'axios';
import {
  GET_NOTIFICATIONS,
  READ_NOTIFICATION,
  SEND_NOTIFICATION,
  START_NOTIFICATIONS_LOADING,
  STOP_NOTIFICATIONS_LOADING,
} from './types';

export const sendNotification = data => async dispatch => {
  try {
    dispatch({ type: START_NOTIFICATIONS_LOADING });
    const res = await axios.post(
      `${process.env.REACT_APP_API}/messages`,
      data,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: SEND_NOTIFICATION,
      payload: res.data.message,
    });
    dispatch({ type: STOP_NOTIFICATIONS_LOADING });
  } catch (err) {
    console.log(err);
    dispatch({ type: STOP_NOTIFICATIONS_LOADING });
  }
};

export const getMessages = () => async dispatch => {
  try {
    dispatch({ type: START_NOTIFICATIONS_LOADING });
    const res = await axios.get(`${process.env.REACT_APP_API}/messages`, {
      withCredentials: true,
    });
    dispatch({
      type: GET_NOTIFICATIONS,
      payload: res.data.messages,
    });
    dispatch({ type: STOP_NOTIFICATIONS_LOADING });
  } catch (err) {
    console.log(err);
    dispatch({ type: STOP_NOTIFICATIONS_LOADING });
  }
};

export const readMessage = id => async dispatch => {
  try {
    await axios.patch(
      `${process.env.REACT_APP_API}/messages/${id}`,
      {},
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: READ_NOTIFICATION,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
}
