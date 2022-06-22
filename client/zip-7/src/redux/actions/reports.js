import axios from 'axios';

import {
  GET_MACHINES,
  GET_REPORTS,
  GET_REPORTS_TYPES,
  START_REPORTS_LOADING,
  STOP_REPORTS_LOADING,
} from './types';

export const getReports = () => async dispatch => {
  dispatch({ type: START_REPORTS_LOADING });
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/reports`, {
      withCredentials: true,
    });
    dispatch({ type: GET_REPORTS, payload: res.data.reports });
    dispatch({ type: STOP_REPORTS_LOADING });
  } catch (err) {
    console.log(err);
    dispatch({ type: STOP_REPORTS_LOADING });
  }
};

export const getReportsTypes = () => async dispatch => {
  dispatch({ type: START_REPORTS_LOADING });
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/reviews`, {
      withCredentials: true,
    });
    dispatch({ type: GET_REPORTS_TYPES, payload: res.data.reviews });
    dispatch({ type: STOP_REPORTS_LOADING });
  } catch (err) {
    console.log(err);
    dispatch({ type: STOP_REPORTS_LOADING });
  }
}

export const getMachines = () => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/reports/machines`, {
      withCredentials: true,
    });
    dispatch({ type: GET_MACHINES, payload: res.data.machines });
  } catch (error) {
    console.log(error);
  }
}
