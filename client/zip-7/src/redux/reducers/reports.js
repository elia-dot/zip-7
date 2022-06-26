import {
  GET_REPORTS,
  START_REPORTS_LOADING,
  STOP_REPORTS_LOADING,
  GET_REPORTS_TYPES,
  GET_MACHINES,
  ADD_REPORT_TYPE,
  ADD_REPORT,
} from '../actions/types';

const initialState = {
  reports: [],
  reportTypes: [],
  machines: [],
  loading: false,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_REPORTS:
      return {
        ...state,
        reports: payload,
        loading: false,
      };
    case GET_REPORTS_TYPES:
      return {
        ...state,
        reportTypes: payload,
        loading: false,
      };
    case ADD_REPORT_TYPE:
      return {
        ...state,
        reportTypes: [...state.reportTypes, payload],
        loading: false,
      };
    case ADD_REPORT:
      return {
        ...state,
        reports: [...state.reports, payload],
        loading: false,
      };
    case GET_MACHINES:
      return {
        ...state,
        machines: payload,
      };
    case START_REPORTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case STOP_REPORTS_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
