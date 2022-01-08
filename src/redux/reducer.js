import { combineReducers } from "redux";

import userReducer from "./reducers/userReducer"

const reducers = {
	userReducer
}

export default combineReducers(reducers);