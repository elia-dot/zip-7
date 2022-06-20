import {
  GET_COMPANIES,
  EDIT_COMPANY,
  START_COMPANIE_LOADING,
  STOP_COMPANIE_LOADING,
  EDIT_CONTACT,
  ADD_CONTACT,
  REMOVE_CONTACT
} from '../actions/types';

const initialState = {
  companies: [],
  loading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_COMPANIES:
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
    case START_COMPANIE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case STOP_COMPANIE_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
