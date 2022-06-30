import axios from 'axios';
import { GET_LOGS, START_LOGS_LOADING, STOP_LOGS_LOADING } from './types';

export const getLogs = () => async dispatch => {
  try {
    dispatch({ type: START_LOGS_LOADING });
    const res = await axios.get(`${process.env.REACT_APP_API}/logs`, {
      withCredentials: true,
    });
    dispatch({
      type: GET_LOGS,
      payload: res.data.logs,
    });
    dispatch({ type: STOP_LOGS_LOADING });
  } catch (error) {
    console.log(error);
    dispatch({ type: STOP_LOGS_LOADING });
  }
};
