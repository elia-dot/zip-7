import axios from 'axios';

import {
  EDIT_COMPANY,
  GET_COMPANIES,
  START_COMPANY_LOADING,
  STOP_COMPANY_LOADING,
  ADD_CONTACT,
  ADD_COMPANY,
  COMPANY_ERROR,
} from './types';

export const getCompanies = () => async dispatch => {
  try {
    dispatch({ type: START_COMPANY_LOADING });
    const res = await axios.get(`${process.env.REACT_APP_API}/companies`, {
      withCredentials: true,
    });
    dispatch({ type: STOP_COMPANY_LOADING });
    dispatch({
      type: GET_COMPANIES,
      payload: res.data.companies,
    });
  } catch (error) {
    dispatch({ type: COMPANY_ERROR, payload: error.response.data.error });
    console.log(error);
  }
};

export const editCompany = (id, data) => async dispatch => {
  try {
    dispatch({ type: START_COMPANY_LOADING });
    const res = await axios.patch(
      `${process.env.REACT_APP_API}/companies/${id}`,
      data,
      {
        withCredentials: true,
      }
    );
    console.log(res.data.company);
    dispatch({ type: STOP_COMPANY_LOADING });
    dispatch({
      type: EDIT_COMPANY,
      payload: { id, company: res.data.company },
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: COMPANY_ERROR, payload: error.response.data.error });
  }
};

export const editContact = (contactId, data) => async dispatch => {
  try {
    dispatch({ type: START_COMPANY_LOADING });
    const res = await axios.patch(
      `${process.env.REACT_APP_API}/users/${contactId}`,
      data,
      {
        withCredentials: true,
      }
    );
    dispatch({ type: STOP_COMPANY_LOADING });
    dispatch({
      type: EDIT_COMPANY,
      payload: { company: res.data.company, contactId, contact: res.data.user },
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: COMPANY_ERROR, payload: error.response.data.error });
  }
};

export const addCompany = data => async dispatch => {
  try {
    dispatch({ type: START_COMPANY_LOADING });
    const res = await axios.post(
      `${process.env.REACT_APP_API}/companies`,
      data,
      {
        withCredentials: true,
      }
    );
    dispatch({ type: STOP_COMPANY_LOADING });
    dispatch({
      type: ADD_COMPANY,
      payload: { company: res.data.company },
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: COMPANY_ERROR, payload: error.response.data.message });
  }
};

export const addContact = data => async dispatch => {
  try {
    dispatch({ type: START_COMPANY_LOADING });
    const res = await axios.post(
      `${process.env.REACT_APP_API}/users/create-user`,
      data,
      {
        withCredentials: true,
      }
    );
    dispatch({ type: STOP_COMPANY_LOADING });
    dispatch({
      type: ADD_CONTACT,
      payload: { company: res.data.company, contact: res.data.user },
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: COMPANY_ERROR, payload: error.response.data.error });
  }
};

export const removeContact = contactId => async dispatch => {
  try {
    dispatch({ type: START_COMPANY_LOADING });
    const res = await axios.delete(
      `${process.env.REACT_APP_API}/users/${contactId}`,
      {
        withCredentials: true,
      }
    );
    dispatch({ type: STOP_COMPANY_LOADING });
    dispatch({
      type: EDIT_COMPANY,
      payload: { company: res.data.company },
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: COMPANY_ERROR, payload: error.response.data.error });
  }
};

export const searchCompany = search => async dispatch => {
  const data = { searchTerm: search };
  try {
    dispatch({ type: START_COMPANY_LOADING });
    const res = await axios.post(
      `${process.env.REACT_APP_API}/companies/search`,
      data,
      {
        withCredentials: true,
      }
    );
    dispatch({ type: STOP_COMPANY_LOADING });
    dispatch({
      type: GET_COMPANIES,
      payload: res.data.companies,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: COMPANY_ERROR, payload: error.response.data.error });
  }
};
