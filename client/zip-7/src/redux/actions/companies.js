import axios from 'axios';

import {
  EDIT_COMPANY,
  GET_COMPANIES,
  START_COMPANIE_LOADING,
  STOP_COMPANIE_LOADING,
  ADD_CONTACT
} from './types';

export const getCompanies = () => async dispatch => {
  try {
    dispatch({ type: START_COMPANIE_LOADING });
    const res = await axios.get(`${process.env.REACT_APP_API}/companies`, {
      withCredentials: true,
    });
    dispatch({ type: STOP_COMPANIE_LOADING });
    dispatch({
      type: GET_COMPANIES,
      payload: res.data.companies,
    });
  } catch (error) {
    dispatch({ type: STOP_COMPANIE_LOADING });
    console.log(error);
  }
};

export const editCompany = (id, data) => async dispatch => {
  try {
    dispatch({ type: START_COMPANIE_LOADING });
    const res = await axios.patch(
      `${process.env.REACT_APP_API}/companies/${id}`,
      data,
      {
        withCredentials: true,
      }
    );
    dispatch({ type: STOP_COMPANIE_LOADING });
    dispatch({
      type: EDIT_COMPANY,
      payload: { id, company: res.data.company },
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: STOP_COMPANIE_LOADING });
  }
};

export const editContact = (contactId, data) => async dispatch => {
  try {
    dispatch({ type: START_COMPANIE_LOADING });
    const res = await axios.patch(
      `${process.env.REACT_APP_API}/users/${contactId}`,
      data,
      {
        withCredentials: true,
      }
    );
    console.log(res.data.company);
    dispatch({ type: STOP_COMPANIE_LOADING });
    dispatch({
      type: EDIT_COMPANY,
      payload: { company: res.data.company, contactId, contact: res.data.user },
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: STOP_COMPANIE_LOADING });
  }
};

export const addContact = (data) => async dispatch => {  try {
    dispatch({ type: START_COMPANIE_LOADING });
    const res = await axios.post(
      `${process.env.REACT_APP_API}/users/create-user`,
      data,
      {
        withCredentials: true,
      }
    );
    dispatch({ type: STOP_COMPANIE_LOADING });
    dispatch({
      type: ADD_CONTACT,
      payload: { company: res.data.company, contact: res.data.user },
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: STOP_COMPANIE_LOADING });
  }
}

export const removeContact = (contactId) => async dispatch => {
  try {
    dispatch({ type: START_COMPANIE_LOADING });
    const res = await axios.delete(
      `${process.env.REACT_APP_API}/users/${contactId}`,
      {
        withCredentials: true,
      }
    );
    dispatch({ type: STOP_COMPANIE_LOADING });
    dispatch({
      type: EDIT_COMPANY,
      payload: { company: res.data.company },
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: STOP_COMPANIE_LOADING });
  }
}
