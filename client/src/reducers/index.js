import { combineReducers } from "redux";
import user from "./user";
import alert from "./alert";
import station from "./station";

export default combineReducers({
  user,
  alert,
  station
})