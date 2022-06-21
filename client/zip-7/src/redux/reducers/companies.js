import {
  GET_COMPANIES,
  EDIT_COMPANY,
  START_COMPANY_LOADING,
  STOP_COMPANY_LOADING,
  EDIT_CONTACT,
  ADD_CONTACT,
  REMOVE_CONTACT,
  ADD_COMPANY, 
  COMPANY_ERROR,
  SEARCH_COMPANY,
} from '../actions/types';

const initialState = {
  companies: [],
  loading: false,
  error: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_COMPANIES:
    case SEARCH_COMPANY:
      return {
        ...state,
        companies: payload,
        loading: false,
      };
    case EDIT_COMPANY:
    case ADD_CONTACT: 
    case REMOVE_CONTACT: 
      return {
        ...state,
        companies: state.companies.map(company =>
          company._id === payload.company._id
            ? payload.company
            : company
        ),
        loading: false,
      };
    case ADD_COMPANY:
      return {
        ...state,
        companies: [...state.companies, payload],
      }
    case EDIT_CONTACT:
      return {
        ...state,
        companies: state.companies.map(company =>
          company._id === payload.id

            ? { ...company, ...payload.company }
            : company
        ),
        loading: false,
      };
    case START_COMPANY_LOADING:
      return {
        ...state,
        loading: true,
      };
    case STOP_COMPANY_LOADING:
      return {
        ...state,
        loading: false,
      };
    case COMPANY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
