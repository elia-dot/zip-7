import axios from 'axios';
import {
  ICOUNT_LOGIN,
  START_ICOUNT_LOADING,
  STOP_ICOUNT_LOADING,
  GET_ICOUNT_CLIENTS
} from './types';

export const icountLogin = data => async dispatch => {
  dispatch({ type: START_ICOUNT_LOADING });
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/icount/auth/login`,
      data
    );
    dispatch({ type: ICOUNT_LOGIN, payload: res.data.sid });
  } catch (err) {
    console.log(err);
    dispatch({ type: STOP_ICOUNT_LOADING });
  }
};

export const icountGetClients = data => async dispatch => {
    console.log(data);
    dispatch({ type: START_ICOUNT_LOADING });
    try {
        const res = await axios.post(
        `${process.env.REACT_APP_API}/icount/clients`,
        data
        );
        console.log(res.data);
        dispatch({ type: GET_ICOUNT_CLIENTS, payload: res.data });
    } catch (err) {
        console.log(err);
        dispatch({ type: STOP_ICOUNT_LOADING });
    }
    }
