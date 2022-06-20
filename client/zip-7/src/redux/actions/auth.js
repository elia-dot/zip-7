import axios from 'axios';
import {
  LOGIN,
  LOGIN_ERROR,
  SIGNUP,
  SIGNUP_ERROR,
  START_AUTH_LOADING,
  STOP_AUTH_LOADING,
  LOAD_USER,
  LOAD_USER_FAILED,
} from './types';

const saveToken = token => {
  localStorage.setItem('token', token);
};

export const loadUser = () => async dispatch => {
  dispatch({ type: START_AUTH_LOADING });
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch({
      type: LOAD_USER_FAILED,
      payload: null,
    });
    return;
  }
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/auth/auth-user`, {
      withCredentials: true,
    });
    dispatch({type: STOP_AUTH_LOADING})
    dispatch({
      type: LOAD_USER,
      payload: res.data.user,
    });
  } catch (error) {
    console.log(error);
    dispatch({type: STOP_AUTH_LOADING})
    dispatch({
      type: LOAD_USER_FAILED,
      payload: null,
    });
  }
};

export const login = data => async dispatch => {
  try {
    dispatch({ type: START_AUTH_LOADING });
    const res = await axios.post(
      `${process.env.REACT_APP_API}/auth/login`,
      data,
      
      { withCredentials: true,  credentials: 'include' }
    );
    saveToken(res.data.token);
    dispatch({ type: STOP_AUTH_LOADING });
    dispatch({
      type: LOGIN,
      payload: res.data.user,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: STOP_AUTH_LOADING });
    dispatch({
      type: LOGIN_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const signup = data => async dispatch => {
  try {
    dispatch({ type: START_AUTH_LOADING });
    const res = await axios.post(
      `${process.env.REACT_APP_API}/auth/signup`,
      data,
      { withCredentials: true, mode: 'same-origin' }
    );
    saveToken(res.data.token);
    dispatch({ type: STOP_AUTH_LOADING });
    dispatch({
      type: SIGNUP,
      payload: res.data.user,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: STOP_AUTH_LOADING });
    dispatch({
      type: SIGNUP_ERROR,
      payload: error.response.data.message,
    });
  }
};
