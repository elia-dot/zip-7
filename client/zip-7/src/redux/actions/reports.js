import axios from 'axios';

import {
  ADD_REPORT_TYPE,
  GET_MACHINES,
  GET_REPORTS,
  GET_REPORTS_TYPES,
  START_REPORTS_LOADING,
  STOP_REPORTS_LOADING,
  ADD_REPORT,
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

export const addReportType = (data) => async dispatch => {
  dispatch({ type: START_REPORTS_LOADING });
  try {
    const res = await axios.post(`${process.env.REACT_APP_API}/reviews`, data, {
      withCredentials: true,
    });
    dispatch({ type: ADD_REPORT_TYPE, payload: res.data.review });
    dispatch({ type: STOP_REPORTS_LOADING });
  } catch (err) {
    console.log(err);
    dispatch({ type: STOP_REPORTS_LOADING });
  }
}

export const addReport = (data) => async dispatch => {
  dispatch({ type: START_REPORTS_LOADING });
  try {
    const res = await axios.post(`${process.env.REACT_APP_API}/reports`, data, {
      withCredentials: true,
    });
    dispatch({ type: ADD_REPORT, payload: res.data.report });
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
