import { combineReducers } from "redux";

import alerts from "./all/alerts"

import dashboard from "./all/dashboard"

export default combineReducers({
    alerts,
    dashboard
});