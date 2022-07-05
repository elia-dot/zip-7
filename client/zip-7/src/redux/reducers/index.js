import { combineReducers } from 'redux';
import auth from './auth';
import companies from './companies';
import reports from './reports';
import logs from './logs';
import users from './users';
import notifications from './notifications';

export default combineReducers({
  auth,
  companies,
  reports,
  logs,
  users,
  notifications,
});
