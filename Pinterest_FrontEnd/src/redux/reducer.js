import { combineReducers } from "redux";
import pinReducer from "./pin/pinReducer";

export default combineReducers({ pin: pinReducer });
