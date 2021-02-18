import { combineReducers } from "redux";

import alerts from "./all/alerts"

import devices from "./all/devices"

export default combineReducers({
    alerts,
    devices
});