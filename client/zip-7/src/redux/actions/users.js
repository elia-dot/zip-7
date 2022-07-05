import axios from 'axios';
import {
  GET_USERS,
  START_USERS_LOADING,
  STOP_USERS_LOADING,
  TOGGLE_BLOCK,
  UPDATE_USER
} from './types';

export const getUsers = () => async dispatch => {
  try {
    dispatch({ type: START_USERS_LOADING });
    const res = await axios.get(`${process.env.REACT_APP_API}/users`, {
      withCredentials: true,
    });
    dispatch({ type: GET_USERS, payload: res.data.users });
  } catch (error) {
    console.log(error);
    dispatch({ type: STOP_USERS_LOADING });
  }
};

export const updateUser = (id, data) => async dispatch => {
  try {
    dispatch({ type: START_USERS_LOADING });
    const res = await axios.patch(
      `${process.env.REACT_APP_API}/users/${id}`,
      data,
      {
        withCredentials: true,
      }
    );
    dispatch({ type: UPDATE_USER, payload: res.data.user });
  } catch (error) {
    console.log(error);
  }
};


export const toggleBlock = id => async dispatch => {
  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_API}/users/${id}/block`,
      {},
      {
        withCredentials: true,
      }
    );
    dispatch({ type: TOGGLE_BLOCK, payload: res.data.user });
  } catch (error) {
    console.log(error);
  }
};
