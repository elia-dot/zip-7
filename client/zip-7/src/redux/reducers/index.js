import { combineReducers } from "redux";
import auth from "./auth";
import companies from "./companies";
import reports from "./reports";

export default combineReducers({
  auth,
  companies,
  reports,
});
