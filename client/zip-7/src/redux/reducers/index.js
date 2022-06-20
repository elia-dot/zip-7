import { combineReducers } from "redux";
import auth from "./auth";
import companies from "./companies";

export default combineReducers({
  auth,
  companies,
});
